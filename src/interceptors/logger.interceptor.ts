import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Logger } from 'winston';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(@Inject('winston') private logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    // Verifica se a requisição é do tipo DELETE
    if (req.method === 'DELETE') {
      this.log(req);
    }
    return next.handle();
  }

  private log(req) {
    this.logger.info({
      timestamp: new Date().toISOString(),
      message: `ID (${req.params.id}) deleted.`,
      route: req.route.path,
      from: req.ip,
      madeBy: 'user',
    });
  }
}
