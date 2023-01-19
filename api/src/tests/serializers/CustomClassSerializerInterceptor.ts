import { map, Observable } from 'rxjs';
import { ClassSerializerInterceptorOptions } from '@nestjs/common/serializer/class-serializer.interceptor';
import {
  CallHandler,
  ClassSerializerInterceptor,
  ExecutionContext,
  PlainLiteralObject,
  SerializeOptions,
} from '@nestjs/common';

export interface CustomClassSerializerInterceptorOptions
  extends ClassSerializerInterceptorOptions {
  getGroupsFromAuthUser?: boolean;
}

export const CustomSerializeOptions = (
  args: CustomClassSerializerInterceptorOptions,
) => SerializeOptions(args);

export class CustomClassSerializerInterceptor extends ClassSerializerInterceptor {
  protected readonly defaultOptions: CustomClassSerializerInterceptorOptions;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextOptions = this.getContextOptions(context);
    const options = {
      ...this.defaultOptions,
      ...contextOptions,
    };
    const req = context.switchToHttp().getRequest();
    if (options.getGroupsFromAuthUser) {
      options.groups = req.user ? req.user?.roles : [];
    }

    return next
      .handle()
      .pipe(
        map((res: PlainLiteralObject | Array<PlainLiteralObject>) =>
          this.serialize(res, options),
        ),
      );
  }
}
