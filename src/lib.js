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
