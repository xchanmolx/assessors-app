import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @ViewChild('input', {static: true}) input!: ElementRef;
  @Input() type = 'text';
  @Input() label!: string;

  constructor(@Self() public controlDir: NgControl, private renderer: Renderer2) { 
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    const control = this.controlDir.control;
    const validators = control?.validator ? [control.validator] : [];
    const asyncValidators = control?.asyncValidator ? [control.asyncValidator] : [];

    control?.setValidators(validators);
    control?.setAsyncValidators(asyncValidators);
    control?.updateValueAndValidity();
  }

  ngAfterViewInit() {
    if (this.label === 'Email_Address') {
      const element = this.renderer.selectRootElement('#Email_Address');
      setTimeout(() => element.focus(), 0);
    }

    if (this.label === 'First_Name') {
      const element = this.renderer.selectRootElement('#First_Name');
      setTimeout(() => element.focus(), 0);
    }

    if (this.label === 'TD_Number') {
      const element = this.renderer.selectRootElement('#TD_Number');
      setTimeout(() => element.focus(), 0);
    }
  }

  onChange(event: Event): void {
    (event.currentTarget as HTMLInputElement).value;
  }

  onTouched() { }

  writeValue(obj: any): void {
    this.input.nativeElement.value = obj || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}