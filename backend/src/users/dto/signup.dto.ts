import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: `Password requirements:
        - Minimum length of 8 characters.
        - Contains at least 1 letter.
        - Contains at least 1 number.
        - Contains at least 1 special character.`,
  })
  password: string;
}
