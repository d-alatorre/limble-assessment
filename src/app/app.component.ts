import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'limble test';
  inputText = '';
  tags: string[] = [];
  showSuggestions = false;
  originalSuggestions: string[] = ['John', 'Jane', 'Doe', 'Alice', 'Bob'];
  suggestions: string[] = this.originalSuggestions;


  addTag(tag: string): void {
    if (tag) {
      this.tags.push(tag);
      this.inputText = '';
      this.showSuggestions = false;
    }
  }

  removeTag(index: number): void {
    this.tags.splice(index, 1);
  }

  onTagInput(event: KeyboardEvent): void {
    const inputText = this.inputText.trim();
    const splitText = inputText.split(' ');
    if (event.key === 'Enter' && inputText) {
      this.addTag(inputText);
    } else if (event.key === '@') {
      this.suggestions = this.originalSuggestions;
      this.showSuggestions = true;
    }
    else if (splitText?.length && splitText[splitText.length - 1][0] == '@') {
      if (splitText[splitText.length - 1].length == 1 || 
          (splitText[splitText.length - 1].length == 2 && event.key === 'Backspace')) {
        this.suggestions = this.originalSuggestions;
      }
      else {
        const lastWord = (splitText[splitText.length - 1]).replace('@', '');
        this.suggestions = this.originalSuggestions.filter(w => w.toLowerCase().includes(lastWord.toLocaleLowerCase()));
      }
    }
  }

  selectSuggestion(suggestion: string): void {
    this.inputText = this.inputText.substring(0, this.inputText.lastIndexOf('@'));
    this.inputText += `@${suggestion}`;
    this.showSuggestions = false;
  }

  closeSuggestions(): void {
    this.showSuggestions = false;
  }
}
