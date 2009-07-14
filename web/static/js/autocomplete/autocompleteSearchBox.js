/*
 * Search box with autocompletion.
 */

var AutocompleteSearch = function(selectedItemsBox) {
  // Elements
  this.element = null;
  this.searchInput = null;
  this.selectedItemsBox = selectedItemsBox;
  
  // Data
  this.items = new Array();
  this.matchedItems = new Array();
  
  // No selection is -1
  this.selectedItem = -1;
};


AutocompleteSearch.prototype.initialize = function(element) {
  this.element = element;
  this.element.addClass(AutocompleteVars.cssClasses.searchParent);
  
  this.searchInput = $('<input type="text"/>').appendTo(this.element);
  
  this.bindKeyEvents();
};

AutocompleteSearch.prototype.bindKeyEvents = function() {
  var me = this;
  this.searchInput.bind("keypress", function(keyEvent) {
    var kc = keyEvent.keyCode;
    if (kc === AutocompleteVars.keyCodes.up) {
      me.shiftSelectionUp();
    }
    else if (kc === AutocompleteVars.keyCodes.down) {
      me.shiftSelectionDown()
    }
    else if (kc === AutocompleteVars.keyCodes.enter) {
      me.selectCurrent();
    }
    else if (kc === AutocompleteVars.keyCodes.esc) {
      me.cancelSelection();
    }
  });
};

AutocompleteSearch.prototype.shiftSelectionUp = function() {
  if (this.selectedItem === -1) {
    return;
  }
  this.selectedItem--;
};

AutocompleteSearch.prototype.shiftSelectionDown = function() {
  if (this.selectedItem === (this.matchedItems.length - 1)) {
    return;
  }
  this.selectedItem++;
};

AutocompleteSearch.prototype.selectCurrent = function() {
  
};

AutocompleteSearch.prototype.cancelSelection = function() {
  
};

AutocompleteSearch.prototype.filterSuggestions = function(list, match) {
  var me = this;
  var returnedList = list.filter(function(element, index, array) {
    return (me.matchSearchString(element.name, match) &&
        !me.selectedItemsBox.isItemSelected(element.id));
  });
  return returnedList;
};

AutocompleteSearch.prototype.matchSearchString = function(text, match) {
  if (!match || !text) {
    return false;
  }
  
  // Split to fragments
  var replaceRe = new RegExp("[!#$%&()*+,./:;<=>?@[\\\]_`{|}~]+");
  var matchFragments = match.replace(replaceRe, '').split(' ');
  
  var a = 5;
  // Loop through fragments
  var allMatch = true;
  for (var i = 0; i < matchFragments.length; i++) {
    var fragment = matchFragments[i];
    if (text.toLowerCase().indexOf(fragment.toLowerCase()) === -1) {
      allMatch = false;
      break;
    }  
  }
  
  return allMatch;
};