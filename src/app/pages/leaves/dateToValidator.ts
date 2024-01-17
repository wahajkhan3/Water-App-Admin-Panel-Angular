import { FormControl } from "@angular/forms";

 // Custom validator function for dateTo
export function dateToValidator (control: FormControl): { [s: string]: boolean } | null {
    const dateFrom = this.leaveForm.get('dateFrom').value; // Get the value of dateFrom
    const selectedDate = new Date(control.value);

    // Calculate the date one day before dateFrom
    const oneDayBeforeDateFrom = new Date(dateFrom);
    oneDayBeforeDateFrom.setDate(oneDayBeforeDateFrom.getDate() + 1);

    // Check if the selected date is not earlier than one day before dateFrom
    if (selectedDate < oneDayBeforeDateFrom) {
        return { 'invalidDateTo': true };
    }

    return null; // Validation passed
}