import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT');

    app.useGlobalPipes(
        new ValidationPipe({
            //! setup global validation pipe
            whitelist: true, //TODO: remove any other fields that are not in the DTO
            forbidNonWhitelisted: true, //TODO: throw an error when any other fields that are not in the DTO
        })
    );
    app.setGlobalPrefix('api/v1', { exclude: [''] });

    //Config Cors
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        credentials: true,
    });

    await app.listen(port);
}
bootstrap();
