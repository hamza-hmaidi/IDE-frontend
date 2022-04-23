import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';

const THEME = 'ace/theme/twilight'; 
const LANG = 'ace/mode/java';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css']
}) export class MainPageComponent implements OnInit {

    @ViewChild('codeEditor') codeEditorElmRef!: ElementRef;
    private codeEditor!: ace.Ace.Editor;
    private editorBeautify:any;
    constructor() { }

    ngOnInit () {
      ace.require('ace/ext/language_tools');
    }
     ngAfterViewInit() {
      ace.require('ace/ext/language_tools');
      this.editorBeautify = ace.require('ace/ext/beautify');

      const element = this.codeEditorElmRef.nativeElement;
        const editorOptions = this.getEditorOptions();
        console.log(editorOptions);
        this.codeEditor = ace.edit(element, editorOptions);
        this.codeEditor.setTheme(THEME);
        this.codeEditor.getSession().setMode(LANG);
        this.codeEditor.setShowFoldWidgets(true); // for the scope fold feature
        
    } 


    private getEditorOptions(): Partial<ace.Ace.EditorOptions> & { enableBasicAutocompletion?: boolean; } {
      const basicEditorOptions: Partial<ace.Ace.EditorOptions> = {
          highlightActiveLine: true,
          minLines: 33,
          maxLines: Infinity,
      };

      const extraEditorOptions = {
          enableBasicAutocompletion: true
      };
      const margedOptions = Object.assign(basicEditorOptions, extraEditorOptions);
      return margedOptions;
  }

  public beautifyContent() {
    if (this.codeEditor && this.editorBeautify) {
       const session = this.codeEditor.getSession();
       this.editorBeautify.beautify(session);
    }
 }
  public consoleCode() {
    const code = this.codeEditor.getValue();
    console.log(code);
}
}