"use strict";

import { defaults } from "jest-config";

export default {
  setupFilesAfterEnv: ["./enzyme.config.js", "jest-extended"],
  moduleNameMapper: {
    "\\.(css|scss|less)$": "identity-obj-proxy"
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, "scss"]
};
