import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { startNewProcessComponent } from './startNewProcess.component';


@NgModule({
  declarations: [startNewProcessComponent],
  imports: [FormsModule],
  exports: [startNewProcessComponent]
})
export class MyAddonModule {}

export { startNewProcessComponent } from './startNewProcess.component';
