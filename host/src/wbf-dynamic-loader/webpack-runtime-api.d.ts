type Scope = unknown;
type Factory = () => any;

type Container = {
  init(sharedScope: Scope): void;
  get(module: string): Factory;
};

declare const __webpack_init_sharing__: (sharedScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: Scope };
