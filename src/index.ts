import internal from "stream";
import Rollbar from "rollbar";
import build, { OnUnknown } from "pino-abstract-transport";

export type RollbarTransportOptions = {
    rollbarOptions: Rollbar.Configuration;
    logErrors?: boolean;
};

const rollbarFactory = (rollbarOptions: Rollbar.Configuration) =>
    new Rollbar(rollbarOptions);

function pinoLevelToRollbarLevel(level: number): string {
    if (level < 30) return "debug";
    else if (level < 40) return "info";
    else if (level < 50) return "warning";
    else if (level < 60) return "error";
    else return "critical";
}

export default async function pinoRollbarTransport(
    options: RollbarTransportOptions
) {
    let rollbar = rollbarFactory(options.rollbarOptions);

    const buildFunction = async function (
        source: internal.Transform & OnUnknown
    ) {
        for await (const obj of source) {
            const { msg, time, level, context, ...props } = obj;
            rollbar.log(
                msg || "",
                {
                    context,
                    level: pinoLevelToRollbarLevel(level),
                    error: props?.err,
                },
                props?.req,
                (error) => {
                    if (options.logErrors && error) {
                        console.error(error);
                    }
                }
            );
        }
    };

    const closeFunction = async (error: Error, cb: Function) => {
        if (options.logErrors && error) {
            console.error(error);
        }
        rollbar.wait(() => cb());
    };

    return build(buildFunction, { close: closeFunction });
}
