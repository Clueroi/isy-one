import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { z } from "zod";
import { EnvService } from "../env/env.service";
import { ExtractJwt, Strategy } from 'passport-jwt'


const tokenPayloadSchema = z.object({
  sub: z.string().uuid(),
})

export type UserPayload = z.infer<typeof tokenPayloadSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: EnvService) {
    const publicKey = config.get('JWT_PUBLIC_KEY')

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256']
    })
  }

  async validate(payload: UserPayload) {
    try {
      const user = tokenPayloadSchema.parse(payload);

      return user;
    } catch (error) {
      // Caso falhe a validação, lançar erro
      throw new Error('Invalid token payload');
    }
  }
}