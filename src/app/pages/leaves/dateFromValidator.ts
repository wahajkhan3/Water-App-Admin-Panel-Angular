import { FormControl } from "@angular/forms";

export function dateFromValidator(control: FormControl): { [s: string]: boolean } | null {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1); // Set to yesterday
    const selectedDate = new Date(control.value);

    // Check if the selected date is not greater than yesterday
    if (selectedDate <= currentDate) {
        return { 'invalidDateFrom': true };
    }

    return null; // Validation passed
}
