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

```env
PORT=8081
MONGODB_URI=mongodb://root:123456@localhost:27017/quyenlee?authSource=admin
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
        ConfigModule.forRoot({ isGlobal: true }),
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
}

export const UserSchema = SchemaFactory.createForClass(User);
```
