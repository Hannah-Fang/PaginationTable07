/* === 深拷貝 ===
   如果要完全的複製整個物件內容。我們必須要自己動手處理，檢查要複製物件的某屬性
   是不是物件，如果是的話，就要再以 Object.assgn 複製一次，並且這個檢查要搭配
   遞迴的概念來檢查，才能確保完全的複製。
 */
export const assign = Object.assign || function assign ( target, ...args ) {
  if ( $.isPlainObject( target ) && args.length > 0 ) {
    args.forEach( ( arg ) => {
      if ( $.isPlainObject( arg ) ) {
        Object.keys( arg ).forEach( ( key ) => {
          target[key] = arg[key];
        } );
      }
    } );
  }

  return target;
};
