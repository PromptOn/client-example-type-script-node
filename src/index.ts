import dotenv from "dotenv";

// note that import paths and interfaces are going to change soon
import { PromptonApi, PromptonApiClient } from "@prompton/prompton/prompton";
import { InferenceResponseData } from "@prompton/prompton/prompton/api/types";

import {
    PromptonApiError,
    PromptonApiTimeoutError,
} from "@prompton/prompton/prompton/errors";

dotenv.config();

async function main() {
    const environment = process.env.PROMPTON_URL; // https://staging.api.prompton.ai or http://127.0.0.1:8000 to .env
    const username = process.env.PROMPTON_USERNAME;
    const password = process.env.PROMPTON_PASSWORD;

    if (!environment || !username || !password) {
        throw new Error(
            "No env PROMPTON_URL or PROMPTON_USERNAME or PROMPTON_PASSWORD"
        );
    }

    //
    // Log in to Prompton API
    //

    let prompton = new PromptonApiClient({ environment });

    console.log("Logging in...");
    let _token = await prompton.authentication.getAccessToken({
        username,
        password,
    });

    let token = _token.accessToken;

    prompton = new PromptonApiClient({ environment, token });

    let user = await prompton.users.getCurrentUser();
    console.log(`Loggedin ${user.email} (${user.role})`);

    //
    // Posting an inference
    //

    let inf_id;
    try {
        console.log("Getting an inference for a prompt...");

        let inf_result = await prompton.inferences.newInference({
            // you need to your own prompt and a Live prompt version first
            // if you pass promptId it picks one from all the live prompt versions randomly
            //    you can  pass a prompt_version_id instead
            promptId: "6489aea62cf0f680e2d56263",
            templateArgs: { what: "a trump fan" },
            endUserId: "node client example user: " + username,
            // endUserId: "mock_me_softly",
            // endUserId: "timeout_me_softly",
            // endUserId: "fail_me_softly",
            clientRefId: "it should work now on staging ",
        });

        console.log(`<--- Inference response id: ${inf_result.id}`);

        let response_data = inf_result.response as InferenceResponseData;
        console.log(
            `  Completition time: ${response_data.completitionDurationSeconds}s\n` +
                `  Token usage: ${JSON.stringify(response_data.tokenUsage)}\n` +
                `  Answer: ${response_data.rawResponse.choices[0].message.content}\n`
        );

        inf_id = inf_result.id;
    } catch (error) {
        if (
            error instanceof PromptonApiError ||
            error instanceof PromptonApiTimeoutError
        ) {
            // @ts-ignore  TODO: adjust this when Inference post response schema is refactored
            inf_id = error.body.detail.inference_id;
            console.log(JSON.stringify(error));

            console.log(
                ` <-- Inference OpenAI Error inferenceId: ${inf_id} \n Error: ${JSON.stringify(
                    error
                )}`
            );
        } else {
            console.log(
                `<--- Unhandled error : ${
                    (error as Error).constructor.name
                }\n Error: ${JSON.stringify(error)}`
            );
            throw error;
        }
    }

    //
    // Fetching inference
    //
    console.log("Fetching inference to get more request details ...");

    let inference = await prompton.inferences.getInferenceById(inf_id);

    console.log(`<--- Inference fetch ${inference.id}:`);
    if (inference.response?.isError) {
        let inference_error =
            inference.response as PromptonApi.InferenceResponseError;
        console.log(
            "  Inference data with error: " +
                JSON.stringify(inference_error.error)
        );
    } else {
        let inf_response =
            inference.response as PromptonApi.InferenceResponseData;

        console.log(
            `Request:\n${inference.request?.rawRequest.messages
                .map((message) => {
                    return ` - ${message.role}: ${message.content}\n`;
                })
                .join("")}`
        );

        console.log(
            `Response:\n${inf_response.rawResponse.choices
                .map((choice, idx) => {
                    return ` [choice ${idx}] - ${choice.message.role}: ${choice.message.content}\n`;
                })
                .join("")}`
        );
    }
}

main();
