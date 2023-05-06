// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthenticationController } from './authentication.controller';
// import { AuthenticationService } from './authentication.service';
// import { User } from './User';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';

// @Module({
//   imports: [
//     PassportModule.register({ defaultStrategy: 'jwt' }),
//     JwtModule.register({
//        secret: 'justASecretKey',
//        signOptions: { expiresIn: 3600 }
//       }),
//     // TypeOrmModule.forFeature([User])
//   ],
//   controllers: [AuthenticationController],
//   providers: [AuthenticationService]
// })
// export class AuthenticationModule {}
