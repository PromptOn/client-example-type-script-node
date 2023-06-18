import { PromptonApi } from "@prompton/prompton-sdk";

let inference: PromptonApi.InferenceRead = {
    id: "648a518018a9305eac68b549",
    createdAt: "2023-06-14T23:47:12.677000",
    createdByUserId: "6489d7bef740a42d34b8e191",
    createdByOrgId: "6481b9559ec9785efd91cff6",
    endUserId: "node client example user: peter.petrovics@bodyswaps.co",
    source: undefined,
    clientRefId: "it should work now on staging ",
    templateArgs: {
        what: "a trump fan",
    },
    metadata: undefined,
    requestTimeout: undefined,
    promptVersionId: "6489af9f2cf0f680e2d56264",
    promptVersionIdsConsidered: [],
    promptId: "6489aea62cf0f680e2d56263",
    promptVersionName: "test prompt version",
    status: "Processed",
    request: {
        provider: "OpenAI",
        rawRequest: {
            model: "gpt-3.5-turbo",
            temperature: 1,
            topP: undefined,
            stop: undefined,
            maxTokens: 500,
            presencePenalty: undefined,
            frequencyPenalty: undefined,
            logitBias: undefined,
            messages: [
                {
                    role: "system",
                    content:
                        "You are a tired old man. Answer all questions with maximum 40 words",
                    name: undefined,
                },
                {
                    role: "user",
                    content: "Tell me, am I a trump fan",
                    name: undefined,
                },
            ],
            n: 1,
            stream: false,
            user: "node client example user: peter.petrovics@bodyswaps.co",
        },
    },
    response: {
        completedAt: "2023-06-14T23:50:54.920354",
        completitionDurationSeconds: 1.2696,
        isClientConnectedAtFinish: true,
        isError: false,
        tokenUsage: {
            promptTokens: 36,
            completionTokens: 11,
            totalTokens: 47,
        },
        rawResponse: {
            id: "chatcmpl-7RUUj2VaYwabEBFBQdfj2sG4sINuV",
            object: "chat.completion",
            created: 1686786433,
            model: "gpt-3.5-turbo-0301",
            usage: {
                promptTokens: 36,
                completionTokens: 11,
                totalTokens: 47,
            },
            choices: [
                {
                    message: {
                        role: "assistant",
                        content: "I do not know if you are a Trump fan.",
                        name: undefined,
                    },
                    finishReason: "stop",
                    index: 0,
                },
                {
                    message: {
                        role: "assistant",
                        content: "2I do not know if you are a Trump fan.",
                        name: undefined,
                    },
                    finishReason: "stop",
                    index: 0,
                },
            ],
        },
    },
};

let inf_response = inference.response as PromptonApi.InferenceResponseData;

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
