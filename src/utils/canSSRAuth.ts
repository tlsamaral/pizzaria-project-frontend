import { AuthTokenError } from "@/services/errors/AuthTokenError";
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from "nookies";

//funcao para paginas que só usuarios logados podem acessar
export function canSSRAuth<P extends { [key: string]: any; }>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx);
        const token = cookies['@nextauth.token'];

        if(!token) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                }
            }
        }

        try{
            return await fn(ctx)
        } catch(err) {
            if(err instanceof AuthTokenError) {
                destroyCookie(ctx, '@nextauth.token')
                return {
                    redirect: {
                        destination: '/',
                        permanent: false,
                    }
                }
            }  else {
                // Adiciona um retorno para qualquer outro erro não específico
                return {
                    redirect: {
                        destination: '/', // Exemplo de página de erro
                        permanent: false,
                    }
                };
            }
        }
    }
}