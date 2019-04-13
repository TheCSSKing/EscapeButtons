# Escape Buttons

Buttons that are fiendishly hard to click.  Perfect for making that "no thanks" option on your newsletter signup impossible to click.  Desktop only - as all buttons use mouse events.

[Download](https://github.com/TheCSSKing/EscapeButtons/releases/download/1.0/escape-buttons.js) or [View the Demo](https://www.thecssking.com/EscapeButtons)

## About

The Escape Buttons move away from your mouse in unique ways by listening to the "mouseover" event.  The buttons are all technically clickable.  If you can find a way to get them to stand still, they will register click events.

## Usage

[Download the library](https://github.com/TheCSSKing/EscapeButtons/releases/download/1.0/escape-buttons.js) and include it on your page.  Add class `btn-escape` and the class of the specific button you want (ie `btn-push` or `btn-jump`) directly to the button (or link) you want to move around.

## Mobile Support

Mobile/touch support is tricky.  Right now all the buttons move based on the "mouseover" event, which mobile devices only occaisonally fire on click/touch.  I experimented with moving them based on the "touchstart" event, but this required listening to the click event and stopping propagation on mobile devices.  Thus, mobile users would not actually be able to click the buttons, which seemed against the spirit of the project. 

### Secret Button

There is a sixth button hidden somewhere on the page - see if you can find it (hint: requires dexterity).


