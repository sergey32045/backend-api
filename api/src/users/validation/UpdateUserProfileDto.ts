import { IsNotEmpty } from "class-validator";

export class UpdateUserProfileDto {
    @IsNotEmpty()
    fullName: string;

    @IsNotEmpty()
    currentPositionId: number;

    @IsNotEmpty()
    targetPositionId: number;
    
    @IsNotEmpty()
    languageId: number;
}