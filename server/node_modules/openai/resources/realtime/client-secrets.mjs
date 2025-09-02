// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.
import { APIResource } from "../../core/resource.mjs";
export class ClientSecrets extends APIResource {
    /**
     * Create a Realtime session and client secret for either realtime or
     * transcription.
     */
    create(body, options) {
        return this._client.post('/realtime/client_secrets', { body, ...options });
    }
}
//# sourceMappingURL=client-secrets.mjs.map