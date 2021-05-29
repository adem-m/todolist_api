import { User } from "../entities";

export interface IEmailService {
    notifyTwoItemsRemaining(user: User): Promise<void>;
}
