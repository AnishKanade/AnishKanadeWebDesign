const values = ['../memory/Media/logo 1.jpeg', '../memory/Media/logo 1.jpeg', '../memory/Media/LOGO 2.jpeg',
  '../memory/Media/LOGO 2.jpeg', '../memory/Media/logo 3.jpeg', '../memory/Media/logo 3.jpeg',
  '../memory/Media/logo 4.jpeg', '../memory/Media/logo 4.jpeg', '../memory/Media/logo5.jpeg',
  '../memory/Media/logo5.jpeg', '../memory/Media/logo6.jpeg', '../memory/Media/logo6.jpeg',
  '../memory/Media/logo7.jpeg', '../memory/Media/logo7.jpeg', '../memory/Media/logo8.jpeg',
  '../memory/Media/logo8.jpeg', '../memory/Media/logo9.jpeg', '../memory/Media/logo9.jpeg',
  '../memory/Media/logo10.jpeg', '../memory/Media/logo10.jpeg'];
// an array of letters


let current_tiles = [];
//this variable is assigned to am array and the length is unknown

let flipped_count = 0;

// https://www.frankmitchell.org/2015/01/fisher-yates/
function shuffle(array) {
  let i, j = 0, temp = null;

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp
  }
}

function valueForTile($tile) {
  
  let index = $tile.data('index');
  return values[index];
}

function flipTile($tile) {
  $tile.addClass('flipped');
  let tempVal = valueForTile($tile);
  $tile.html('<img src="' + tempVal + '" class="ph" alt="" >' );
}

function unflipTile($tile) {
  $tile.removeClass('flipped');
  $tile.html('');
}

function tileFlipped($tile) {
  return $tile.hasClass('flipped');
}

function unflipCurrentTiles() {
  unflipTile(current_tiles[0]);
  unflipTile(current_tiles[1]);

  current_tiles = [];
}

function handleTileClick() {
  if (current_tiles.length < 2) {
    let $tile = $(this);

    if (!tileFlipped($tile)) {
      flipTile($tile);

      switch (current_tiles.length) {
        case 0:
          current_tiles.push($tile);
          break;
        case 1:
          current_tiles.push($tile);

          const tile1_value = valueForTile(current_tiles[0]);
          const tile2_value = valueForTile(current_tiles[1]);

          if (tile1_value === tile2_value) {
            current_tiles = [];
            flipped_count += 2;

            if (flipped_count === values.length) {
              alert('You Won!');
              newBoard();
            }
          } else {
            setTimeout(unflipCurrentTiles, 250);
          }
      }
    }
    // if (tile1_value == tile2_value) {
    //   current_tiles = [];
    //   flipped_count += 2;
//
    //   if (flipped_count == values.length) {
    //     alert('You Won!');
    //     newBoard();
    //   }
    // } else {
    //   setTimeout(unflipCurrentTiles, 250);
    // }
  }//
}

function newBoard() {
  shuffle(values);
  flipped_count = 0;

  let output = '';
  for (let i = 0; i < values.length; i++) {
    output += '<div class="tile" data-index="' + i + '"></div>';
  }

  $('#board').html(output);
}

$(function () {
  $('#board').on('click', '.tile', handleTileClick);

  newBoard();
});
