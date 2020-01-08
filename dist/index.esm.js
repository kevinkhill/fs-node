import fs from 'fs';
import isImage from 'is-image';
import { filter, reject, get, map, any, flow, includes, last, find } from 'lodash/fp';
import path from 'path';
import readdirp from 'readdirp';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var onlyFiles = filter(function (node) {
  return node.isFile;
});
var onlyDirs = filter(function (node) {
  return node.isDirectory;
});
var noFiles = reject(function (node) {
  return node.isFile;
});
var noDirs = reject(function (node) {
  return node.isDirectory;
});
var noDotfiles = reject(function (node) {
  return node.name.startsWith(".");
});
function isSetupNode(node) {
  return node.name === "SETUP_INFO";
}
function getExt(filename) {
  var parts = filename.split(".");

  if (parts.length > 1) {
    return parts[parts.length - 1];
  }
}

function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

function _async(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

var ProgramVault =
/*#__PURE__*/
function () {
  function ProgramVault(options) {
    _classCallCheck(this, ProgramVault);

    this.root = "";
    this.currentDir = "/";
    this.whitelist = {
      ext: ["nc", "mcam"]
    };
    this.blacklist = {
      ext: []
    };
    this.index = [];
    var windowExists = typeof window !== "undefined";

    if (windowExists && "nw" in window) {
      var nwRequire = get("nw.require", window);
      this._path = nwRequire("path");
      this._fs = nwRequire("fs").promises;
      this._readdirp = nwRequire("readdirp");
    } else {
      this._path = path;
      this._fs = fs.promises;
      this._readdirp = readdirp;
    }

    if (options && "root" in options) {
      this.setRoot(options.root);
    }
  }
  /**
   * Return `this.cwd` as an absolute path
   */


  _createClass(ProgramVault, [{
    key: "setRoot",

    /**
     * Set a new root directory for the vault
     */
    value: function setRoot(rootPath) {
      var _this$_path = this._path,
          resolve = _this$_path.resolve,
          normalize = _this$_path.normalize;
      this.root = resolve(normalize(rootPath));
    }
    /**
     * Behaves the same way `cd` does, with `/` acting as `this.root`
     */

  }, {
    key: "cd",
    value: function cd() {
      var fspath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/";

      if (fspath.startsWith("/")) {
        this.currentDir = fspath;
      } else {
        this.currentDir = this._path.join(this.currentDir, fspath);
      }

      return this;
    }
    /**
     * Get a listing of all the files from `this.root`
     */

  }, {
    key: "getIndex",
    value: function getIndex() {
      try {
        var _this2 = this;

        return _await(_this2.readdirp(_this2.root), function (_this$readdirp) {
          return map(function (file) {
            return file.path;
          }, _this$readdirp);
        });
      } catch (e) {
        return Promise.reject(e);
      }
    }
    /**
     * Rescan the vault for files and populate the index
     */

  }, {
    key: "rebuildIndex",
    value: function rebuildIndex() {
      try {
        var _this4 = this;

        return _await(_this4.getIndex(), function (_this3$getIndex) {
          _this4.index = _this3$getIndex;
        });
      } catch (e) {
        return Promise.reject(e);
      }
    }
    /**
     * Check if `this.cwd` has a "SETUP_INFO" folder inside
     *
     * If `path` is given, then it will be used instead of `this.cwd`
     */

  }, {
    key: "hasSetupInfo",
    value: function hasSetupInfo(relpath) {
      try {
        var _this6 = this;

        return _await(_this6.getDirs(relpath), function (_this5$getDirs) {
          return any(isSetupNode, _this5$getDirs);
        });
      } catch (e) {
        return Promise.reject(e);
      }
    }
    /**
     * Get the "SETUP_INFO" dir from `this.cwd`
     *
     * If `path` is given, then it will be used instead of `this.cwd`
     */

  }, {
    key: "getSetupInfo",
    value: function getSetupInfo(relpath) {
      try {
        var _this8 = this;

        if (relpath) _this8.cd(relpath);
        return _await(_this8.hasSetupInfo(), function (_this7$hasSetupInfo) {
          return _this7$hasSetupInfo ? _this8.getContents("SETUP_INFO") : [];
        });
      } catch (e) {
        return Promise.reject(e);
      }
    } // async getSelf(): Promise<FsNode> {
    //   const thisDir = last(this.cwd.split(this._path.sep));
    //   return find(
    //     (node: FsNode) => node.name === thisDir,
    //     await this.getContents("..")
    //   ) as FsNode;
    // }

    /**
     * Retrive a listing of all `FsNode` in `this.cwd`
     *
     * If `path` is given, then it will be used instead of `this.cwd`
     */

  }, {
    key: "getContents",
    value: function getContents(relpath) {
      try {
        var _this10 = this;

        if (relpath) _this10.cd(relpath);

        var _flow2 = flow([map(function (dirent) {
          return _this10.createFsNode(dirent);
        }), reject(function (node) {
          return includes(node.ext, _this10.blacklist.ext);
        })]);

        return _await(_this10.readdir(_this10.cwd), _flow2);
      } catch (e) {
        return Promise.reject(e);
      }
    }
    /**
     * Get a listing of all directory `FsNode` in `this.cwd`
     */

  }, {
    key: "getDirs",
    value: function getDirs(relpath) {
      try {
        var _this12 = this;

        if (relpath) _this12.cd(relpath);
        return _await(_this12.getContents(), noFiles);
      } catch (e) {
        return Promise.reject(e);
      }
    }
    /**
     * Get a listing of all the file `FsNode` in `this.cwd`
     *
     * Use the `{ dotfiles }` option to reveal `.*` files if needed
     */

  }, {
    key: "getFiles",
    value: function getFiles() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        dotfiles: false
      };

      try {
        var _this14 = this;

        return _await(_this14.getContents(), function (_this13$getContents) {
          var files = noDirs(_this13$getContents);
          return options.dotfiles === false ? noDotfiles(files) : "onlyExt" in options ? filter(function (node) {
            return node.ext === options.onlyExt;
          }, files) : files;
        });
      } catch (e) {
        return Promise.reject(e);
      }
    }
    /**
     * Read a directory for files
     */

  }, {
    key: "readdir",
    value: function readdir(abspath) {
      if (!this._path.isAbsolute(abspath)) {
        throw Error("this.readdir must be given an absolute path");
      }

      return fs.promises.readdir(abspath, {
        withFileTypes: true
      });
    }
    /**
     * Recusively read a directory for files
     */

  }, {
    key: "readdirp",
    value: function readdirp(abspath) {
      if (!this._path.isAbsolute(abspath)) {
        throw Error("this.readdirp must be given an absolute path");
      }

      return this._readdirp.promise(abspath);
    }
    /**
     * Build a path from path pieces relative to `this.root`
     */

  }, {
    key: "joinRoot",
    value: function joinRoot(abspath) {
      return this._path.join(this.root, abspath.replace(/^\//, ""));
    }
    /**
     * Build a path from path pieces relative to `this.cwd`
     */

  }, {
    key: "joinPath",
    value: function joinPath() {
      var _this$_path2;

      for (var _len = arguments.length, paths = new Array(_len), _key = 0; _key < _len; _key++) {
        paths[_key] = arguments[_key];
      }

      return (_this$_path2 = this._path).join.apply(_this$_path2, [this.cwd].concat(paths));
    }
    /**
     * Create a new {@link FsNode} from a Dirent
     */

  }, {
    key: "createFsNode",
    value: function createFsNode(dirent) {
      var _this15 = this,
          _this16 = this,
          _this17 = this;

      var isFile = dirent.isFile();
      var isDirectory = dirent.isDirectory();

      var relpath = this._path.join(this.cwd.replace(this.root, ""), dirent.name);

      var abspath = this._path.join(this.root, this.joinPath(dirent.name));

      var currentDir = last(this.cwd.split(this._path.sep));
      return {
        abspath: abspath,
        relpath: relpath,
        isFile: isFile,
        isDirectory: isDirectory,
        name: dirent.name,
        isImage: isImage(abspath),
        ext: getExt(dirent.name),
        dir: this._path.resolve(abspath.replace(dirent.name, "")),
        getSetupInfo: _async(function () {
          return function () {
            if (isDirectory) {
              return _await(_this15.getDirs(relpath), function (_this15$getDirs) {
                var hasSetupInfo = any(isSetupNode, _this15$getDirs);

                if (hasSetupInfo) {
                  return _this15.getContents("SETUP_INFO");
                }
              });
            }
          }();
        }),
        getContents: _async(function () {
          return _await(isFile ? _this16._fs.readFile(abspath) : _this16.getContents(abspath), function (_this16$_fs$readFile) {
            return isFile ? _this16$_fs$readFile.toString() : _this16$_fs$readFile;
          }, !isFile);
        }),
        getParent: _async(function () {
          return _await(_this17.getDirs(".."), function (_this17$getDirs) {
            return find(function (node) {
              return node.name === currentDir;
            }, _this17$getDirs);
          });
        })
      };
    }
  }, {
    key: "cwd",
    get: function get() {
      return this.joinRoot(this.currentDir);
    }
  }]);

  return ProgramVault;
}();

export { ProgramVault };
