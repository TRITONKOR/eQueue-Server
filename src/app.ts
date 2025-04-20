import fastifyRequestContext from "@fastify/request-context";
import fastifyRequestLogger from "@mgcrea/fastify-request-logger";
import Fastify, { FastifyInstance } from "fastify";

import routes from "./api/routes";
import { config } from "./config/config";

const bootstrapFastify = (): FastifyInstance => {
    const fastify = Fastify({
        exposeHeadRoutes: false,
        connectionTimeout: 20000,
        ignoreTrailingSlash: false,
        logger: !config.IS_DEV_ENV || {
            level: "debug",
            transport: {
                target: "@mgcrea/pino-pretty-compact",
                options: {
                    colorize: true,
                    translateTime: "HH:MM:ss Z",
                    ignore: "pid,hostname",
                },
            },
        },
        disableRequestLogging: true,
    });

    if (config.IS_DEV_ENV) {
        fastify.register(fastifyRequestLogger, {});

        fastify.ready(() => {
            console.log(`\nAPI Structure\n${fastify.printRoutes()}`);
        });
    }

    fastify.register(fastifyRequestContext, {
        hook: "preValidation",
        defaultStoreValues: {
            hasSession: false,
            sessionData: {},
        },
    });

    fastify.register(routes, { prefix: "/api" });

    return fastify;
};

export default bootstrapFastify;
