export let graphmodified: any = {
1:{
    index: 1,
    x: 150,
    y: 150,
    distance: 0,
    edges: [{
      index: 2,
      x: 450,
      y: 150,
      marked: false
    }, 
    {index: 4,
        x: 150,
        y: 450,
        marked: false},
   ]
  
  },
  2:{
    index: 2,
    x: 450,
    y: 150,
    distance: 0,

    edges: [{
      index: 1,
      x: 150,
      y: 150,
      marked: false
    },{
      index: 3,
      x: 750,
      y: 150,
      marked: false
    },
    {
      index: 5,
      x: 450,
      y: 450,
      marked: false
    }
    ]
  },
 3: {
    index: 3,
    x: 750,
    y: 150,
    distance: 0,
    edges: [ {index: 2,
      x: 450,
      y: 150,
      marked: false
    },{
      index: 6,
      x: 750,
      y: 450,
      marked: false
    },]
  },
  4:{
    index: 4,
    x: 150,
    y: 450,
    distance: 0,
    edges: [{
      index: 1,
      x: 150,
      y: 150,
      marked: false
    }, {
      index: 5,
      x: 450,
      y: 450,
    marked: false},
    {
      index: 7,
      x: 150,
      y: 750,
    marked: false}]}  
    ,
  5:{
    index: 5,
    x: 450,
    y: 450,
    distance: 0,
    edges: [{
      index: 2,
      x: 450,
      y: 150,
      marked: false
    },  
    {index: 4,
      x: 150,
      y: 450,
      marked: false},
      {
        index: 6,
        x: 750,
        y: 450,
      marked: false},
      {
        index: 8,
        x: 450,
        y: 750,
      marked: false}
    ]
  }
    ,
  6:{
    index: 6,
    x: 750,
    y: 450,
    distance: 0,
    edges: [  
      {
        index: 3,
        x: 750,
        y: 150,
        marked: false
      }, {
      index: 5,
      x: 450,
      y: 450,
      marked: false
    },
    {
        index: 9,
        x: 750,
        y: 750,
        marked: false},
       ]
  }
    ,
  7:{
    index: 7,
    x: 150,
    y: 750,
    distance: 0,
    edges: [
      {index: 4,
        x: 150,
        y: 450,
        marked: false},
      {
        index: 8,
        x: 450,
        y: 750,
        marked: false
      }
    ]
  },
  8:{
    index: 8,
    x: 450,
    y: 750,
    distance: 0,
    edges: [
      {
        index: 5,
        x: 450,
        y: 450,
        marked: false
      },
      {
        index: 7,
        x: 150,
        y: 750,
      marked: false},

      {
        index: 9,
        x: 750,
        y: 750,
        marked: false
      }
    ]
  },
  9:{
    index: 9,
    x: 750,
    y: 750,
    distance: 0,
    edges: [
      {
        index: 6,
        x: 750,
        y: 450,
      marked: false},
      {
        index: 8,
        x: 450,
        y: 750,
        marked: false
      }
    ]
  }
}
  
    export let graph = {
        1: { 2: 1, 4: 3},
        2: { 3: 1, 5: 3},
        3: { 6: 1},
        4: {5:3,7: 4 },
        5: { 6:3, 8:4},
        6: {9: 1,5: 3},
        7: {6: 2},
        8:{9: 3},
        9:{ 3: 4}
    };