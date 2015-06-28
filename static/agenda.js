/*global console, XMLHttpRequest, document */
var agenda = (function (console, XMLHttpRequest, editForm) {
    'use strict';
    var url = 'http://localhost:8080/agenda/',
	tagIndex = 0;

    return {
	get: function () {
	    var invocation = new XMLHttpRequest();
	    invocation.open('GET', url, true);
	    invocation.onload = function () {
		console.log(this.responseText);
	    };
	    invocation.send();
	},
	addTag: function () {
	    var tagsDiv = editForm.querySelector('.tags'),
		tag = document.createElement('div');

	    tagIndex += 1;

	    tag.innerHTML = '<div class="tag"><input type="text" class="content" id="tagText-' +
		tagIndex + '" /> ' +
		'<label for="tagItalic-' + tagIndex + '">Italic:</label> ' +
		'<input class="italic" type="checkbox" id="tagItalic-' +
		tagIndex + '" /> ' +
		'<label for="tagBold-' + tagIndex + '">Bold:</label> ' +
		'<input class="bold" type="checkbox" id="tagBold-' +
		tagIndex + '" /></div>';

	    tagsDiv.appendChild(tag);
	},
	create: function () {
	    var dateComponent = editForm.querySelector('#date'),
		entryDate = new Date(dateComponent.value),
		titleComponent = editForm.querySelector('#title'),
		title = titleComponent.value,
		favoriteComponent = editForm.querySelector('#favorite'),
		favorite = favoriteComponent.checked,
		tagsDivs = editForm.querySelectorAll('.tag'),
		tagDiv,
		i,
		tags,
		contentComponent,
		italicComponent,
		boldComponent,
		objectToCreate,
		invocation = new XMLHttpRequest();

	    tags = [];
	    for (i = 0; i < tagsDivs.length; i += 1) {
		tagDiv = tagsDivs[i];
		contentComponent = tagDiv.querySelector('.content');
		italicComponent = tagDiv.querySelector('.italic');
		boldComponent = tagDiv.querySelector('.bold');
		tags.push(
		    {
			content: contentComponent.value,
			italic: italicComponent.checked,
			bold: boldComponent.checked
		    }
		);
	    }

	    objectToCreate = {
		title: title,
		date: entryDate,
		favorite: favorite,
		tags: tags
	    };

	    invocation.open('POST', url + 'create', true);
	    invocation.setRequestHeader('Content-Type', 'application/json');
	    invocation.onload = function () {
		console.log(this.responseText);
	    };
	    invocation.send(JSON.stringify(objectToCreate));
	}
    }
}(console, XMLHttpRequest, document.getElementById('editForm')));
