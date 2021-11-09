const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const actData = require( './mock/activity.json' );

app.use( express.static( __dirname ) );
app.use( bodyParser.json() );

const _port = process.env.PORT || 3000;
const _url = '/activity/record';

// 指定開啟頁面
app.get( '/index.html', function ( req, res ) {
    res.sendFile( __dirname + "/" + "index.html" );
} )

// 取得全部資料
app.get( _url, function ( req, res ) {
    res.send( actData );
} )

// 取得單筆資料 (by id)
app.get( _url + '/:id', function ( req, res ) {
    const id = req.params.id;
    let arr = [];

    actData.forEach( function ( obj, index ) {
        if ( obj.id === id ) {
            arr.push( actData[index] );
        }
    } );

    res.send( arr );
} )

// 新增資料
app.post( _url, function ( req, res ) {
    const newID = actData.length + 1;
    const newData = {
        id: newID.toString(),
        title: req.body.title,
        name: req.body.name,
        email: req.body.email,
        bref: req.body.bref,
        datetime: new Date().toISOString().slice( 0, 10 )
    };
    
    actData.push.apply( actData, [newData] );

    // 回傳新增後的整筆資料
    res.send( newData );
} );

// 修改單筆資料 (by id)
app.put( _url + '/:id', function ( req, res ) {
    console.log(req.body);
    const id = req.body.id;
    const newTitle = req.body.title;
    const newName = req.body.name;
    const newEmail = req.body.email;
    const newBref = req.body.bref;
    const updateData = {
        id: id.toString(),
        title: newTitle,
        name: newName,
        email: newEmail,
        bref: newBref,
        datetime: new Date().toISOString().slice( 0, 10 )
    };

    actData.forEach( function ( obj, i ) {
        if ( obj.id === id ) {
            obj.title = newTitle;
            obj.name = newName;
            obj.email = newEmail;
            obj.bref = newBref;
        }
    } );

    // 回傳更新後的單筆資料
    res.send( updateData );
} );

// 刪除單筆資料 (by id)
app.delete( _url + '/:id', function ( req, res ) {
    const id = (req.params.id).substr(1);
    
    actData.forEach( function ( obj, i ) {
      if ( true && obj.id === id ) {
        actData.splice( i, 1 );
      }
    } );

    // 回傳指定刪除當筆id與刪除後的整筆資料
    res.send( {
        id: id,
        data: actData
    } );
} );

app.listen( _port, function () {
    console.log( 'Example app listening on port 3000!' );
} );
