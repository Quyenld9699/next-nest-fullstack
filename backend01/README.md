# **[<Back](../README.md)**

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Command

Create resource

```bash
nest g resource [name_resource] [--no-spec]
```

file `.env`

```.env
PORT=8081
MONGODB_URI=mongodb://root:123456@localhost:27017/quyenlee?authSource=admin
JWT_SECRET_KEY=aa4f8e2b-0d8a-49d1-be30-f532d78fbb56
JWT_ACCESS_TOKEN_EXPIRES_IN=1000d
```

file `.env.local`

```.env.local
MAILDEV_INCOMING_USER=
MAILDEV_INCOMING_PASS=
```

Change dynamic port get from `.env` in `main.ts`

```ts
import { ConfigService } from '@nestjs/config';

const configService = app.get(ConfigService);
const port = configService.get<number>('PORT');
await app.listen(port);
```

Connect mongodb

```ts
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        UsersModule,
        ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env', '.env.local'] }),  // TODO: Khai bao env file path app read
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGODB_URI'),
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
```

**`schemas (in mongodb) is entities (SQL)`**

A simple schema

```ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop()
    name: string;

    @Prop()
    age: number;

    @Prop({ default: UserRoles.USER })
    role: UserRoles;

    @Prop({ default: AccountType.NORMAL })
    accountType: AccountType;
}

export const UserSchema = SchemaFactory.createForClass(User);
```

## Auth Login JWT

```ts
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        UsersModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                global: true,
                secretOrPrivateKey: configService.get<string>('JWT_SECRET_KEY'),
                signOptions: {
                    expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
```

## Authentication

Should use Passport.

```bash
npm i --save-exact @nestjs/passport@10.0.3 passport@0.7.0 passport-local@1.0.0
npm i --save-dev @types/passport-local
npm i --save-exact @nestjs/jwt@10.2.0 passport-jwt@4.0.1
npm i --save-dev @types/passport-jwt
```

### Guard and strategy

Each `guard` have strategy: Ex:

-   `JwtAuthGuard` have `JwtStrategy`
-   `LocalAuthGuard` have `LocalStrategy`

In `controller` when use `@UseGuards(LocalAuthGuard | JwtAuthGuard)` the request return data user by function `validate` in `LocalStrategy | JwtStrategy`

## Send email authen

```bash
npm i --save-exact @nestjs-modules/mailer@2.0.2 nodemailer@6.9.14 handlebars@4.7.8
npm i --save-dev @types/nodemailer
```
