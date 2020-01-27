'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = _interopDefault(require('path'));
var fs = _interopDefault(require('fs'));
var fp = require('lodash/fp');
var map = _interopDefault(require('lodash/fp/map'));
var reject = _interopDefault(require('lodash/fp/reject'));
var readdirp = _interopDefault(require('readdirp'));

/**
 * Create a new {@link FsNode} from an absolute path
 *
 * If another node is given, then a new node will be
 * created from that node as the root and the path as
 * relative.
 */
function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

function _invoke(body, then) {
  var result = body();

  if (result && result.then) {
    return result.then(then);
  }

  return then(result);
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

var createNode = _async(function (abspath, fromNode) {
  var _exit = false;
  var name;

  if (path.isAbsolute(abspath)) {
    name = abspath.split(path.sep).pop();
  } else {
    name = abspath;
  }

  return _invoke(function () {
    if (fromNode) {
      // console.log(fromNode, name);
      return _await(fs.promises.lstat(abspath), function (stats) {
        _exit = true;
        return Object.freeze({
          name: name,
          ext: path.extname(name),
          relpath: abspath.replace(fromNode.root, ""),
          abspath: abspath,
          root: fromNode.root,
          isRoot: false,
          isFile: stats.isFile(),
          isDirectory: stats.isDirectory()
        });
      });
    }
  }, function (_result) {
    if (_exit) return _result;

    if (!path.isAbsolute(abspath)) {
      throw Error("root must be an absolute path");
    }

    return Object.freeze({
      name: name,
      abspath: abspath,
      relpath: "/",
      root: abspath,
      isRoot: true,
      isFile: false,
      isDirectory: true
    });
  });
});

/**
 * Behaves the same way `cd` does, with `/` acting as `this.dest`
 */

function cd(node) {
  var dest = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/";
  var newDest;

  if (dest.startsWith("/")) {
    newDest = node.root;
  } else {
    newDest = path.join(node.abspath, dest);
  }

  return createNode(newDest, node);
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
var onlyExt = function onlyExt(nodes, extension) {
  return fp.filter(function (node) {
    return node.ext === extension;
  }, nodes);
};
var onlyFiles = fp.filter(function (node) {
  return node.isFile;
});
var onlyDirs = fp.filter(function (node) {
  return node.isDirectory;
});

/**
 * Retrive all {@link FsNode} from the given node
 */

function _await$1(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

function _async$1(f) {
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

var ls = _async$1(function (node, relpath) {
  return _await$1(relpath ? cd(node, relpath) : node, function (dest) {
    return _await$1(fs.promises.readdir(dest.abspath), function (pathEntries) {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      var nodeCreator = function nodeCreator(entry) {
        return createNode(path.join(dest.abspath, entry), dest);
      };

      return Promise.all(map(nodeCreator, pathEntries));
    });
  }, !relpath);
});

function _await$2(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

function _catch(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }

  if (result && result.then) {
    return result.then(void 0, recover);
  }

  return result;
}

function _async$2(f) {
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

var readFile = _async$2(function (node) {
  if (node.isDirectory) {
    throw Error("cannot readFile if node.isDirectory === true");
  }

  return _catch(function () {
    return _await$2(fs.promises.readFile(node.abspath), function (buffer) {
      return buffer.toString();
    });
  }, function (error) {
    return error.toString();
  });
});

/**
 * Sugar function to handle either a file or dir node.
 */

function getContents(node) {
  return node.isFile ? readFile(node) : ls(node);
}

/**
 * Sugar function to get only dir nodes
 */

function _await$3(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

function _async$3(f) {
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

var getDirs = _async$3(function (node, relpath) {
  return _await$3(relpath ? cd(node, relpath) : node, function (dest) {
    return _await$3(ls(dest), function (_ls) {
      var dirs = onlyDirs(_ls);
      return dirs;
    });
  }, !relpath);
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

/**
 * Sugar function to get only files from a node
 *
 * Provides the option to inlcude dotfiles
 */

function _await$4(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

function _async$4(f) {
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

var getFiles = _async$4(function (node, relpath) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    dotfiles: false
  };
  return _await$4(relpath ? cd(node, relpath) : node, function (dest) {
    return _await$4(ls(dest), function (_ls) {
      var files = onlyFiles(_ls);
      return options.dotfiles === false ? noDotfiles(files) : files;
    });
  }, !relpath);
});

/**
 * Scan a node for files and return a list of paths
 */
function _await$5(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}
/**
 * Recusively scan a node for files
 */


function _async$5(f) {
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

var crawl = _async$5(function (node) {
  return _await$5(readdirp.promise(node.abspath), function (_readdirp$promise) {
    return map("path", _readdirp$promise);
  });
});
var scan = _async$5(function (node) {
  var _this = this;

  return _await$5(fs.promises.readdir(node.abspath), function (_fs$promises$readdir) {
    return map(function (entry) {
      return path.join(_this.currentDir, entry);
    }, _fs$promises$readdir);
  });
});

function _await$6(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

function _async$6(f) {
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

var getSetupInfo = _async$6(function (node, relpath) {
  return _await$6(relpath ? cd(node, relpath) : node, function (dest) {
    return _await$6(hasSetupInfo(dest), function (_hasSetupInfo) {
      if (_hasSetupInfo === false) {
        return undefined;
      }

      return _await$6(ls(dest), function (_ls) {
        return fp.find(isSetupNode, _ls);
      });
    });
  }, !relpath);
});
var isSetupNode = function isSetupNode(node) {
  return node.name === "SETUP_INFO";
};
var hasSetupNode = fp.any(isSetupNode);
var hasSetupInfo = fp.any(hasSetupNode);

exports.cd = cd;
exports.crawl = crawl;
exports.createNode = createNode;
exports.getContents = getContents;
exports.getDirs = getDirs;
exports.getFiles = getFiles;
exports.getSetupInfo = getSetupInfo;
exports.hasSetupInfo = hasSetupInfo;
exports.hasSetupNode = hasSetupNode;
exports.isSetupNode = isSetupNode;
exports.ls = ls;
exports.noDirs = noDirs;
exports.noDotfiles = noDotfiles;
exports.noFiles = noFiles;
exports.onlyDirs = onlyDirs;
exports.onlyExt = onlyExt;
exports.onlyFiles = onlyFiles;
exports.readFile = readFile;
exports.scan = scan;
