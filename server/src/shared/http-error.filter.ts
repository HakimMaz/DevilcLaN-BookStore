import { Catch, HttpException, ArgumentsHost, ExceptionFilter, Logger } from "@nestjs/common";

@Catch()
export class HttpErrorFilter implements ExceptionFilter{
    catch(exception :HttpException,host: ArgumentsHost){
        const cnx =host.switchToHttp();
        const request=cnx.getRequest();
        const response =cnx.getResponse();
        const status=exception.getStatus();
        const responseError={
            code:status,
            Timestamp:new Date().toLocaleDateString(),
            path:request.url,
            method:request.method,
            message:exception.message.error || exception.message || null
        }
        Logger.error(
        `${request.method} ${request.url}`,
         JSON.stringify(responseError),
        'ExceptioFilter'
        )

        response.status(404).json(responseError);

    }



}