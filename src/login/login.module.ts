import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/services/user.service';
import { UserModule } from 'src/user/user.module';
import { jwtConstants } from './constants';
import { LoginController } from './controllers/login.controllers';
import { LocalStrategy } from './strategies/local.strategy';
import { LoginService } from './services/login.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
	imports: [
		UserModule,
		PassportModule,
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '60m' },
		}),
	],
	controllers: [LoginController],
	providers: [LoginService, LocalStrategy, UserService, JwtStrategy],
})
export class reCaptLoginModule {}

