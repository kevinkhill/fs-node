import mime from "mime";

mime.define({ "text/gcode": ["nc"] }, true);
mime.define({
  "application/mastercam": ["mcam", "mcx-9", "mcx-8", "mc9"]
});

export { mime };
