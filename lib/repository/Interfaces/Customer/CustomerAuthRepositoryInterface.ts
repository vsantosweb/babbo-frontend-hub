import { CredentialsType } from "@/types";
import { ApiResponseType } from "@/types";
import { AuthRepositoryInterface } from "@/interfaces";
import { ResetPasswordType } from "@/types";


export interface CustomerAuthRepositoryInterface extends AuthRepositoryInterface {
    /**
     * Realiza o login do usuário usando autenticação social.
     * @param {CredentialsType} credentials - As credenciais do usuário.
     * @returns {Promise<ApiResponseType | null>} Uma promessa que resolve com a resposta da API ou null.
     */
    socialLogin(credentials: CredentialsType): Promise<ApiResponseType | null>;


    register(data: Record<string, any>): Promise<ApiResponseType | null>;

    /**
     * Reseta a senha do usuário com os dados fornecidos.
     * @param {ResetPasswordType} data - Os dados para redefinir a senha.
     * @returns {Promise<ApiResponseType | null>} Uma promessa que resolve com a resposta da API ou null.
     */
    resetPassword(data: ResetPasswordType): Promise<ApiResponseType | null>;
}