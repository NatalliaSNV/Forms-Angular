import { FormControl } from "@angular/forms";

export class MyValidator{
    static restrictedEmails(control: FormControl): {[key: string]: boolean} | null {
        if (['test@mail.ru', 'non@gmail.com'].includes(control.value)) {
            return { 'restricted': true}
        };
        return null;
    }
}