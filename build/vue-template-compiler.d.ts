declare module 'vue-template-compiler' {
  export function parseComponent(template: string, options?: ParseComponentOptions): SFCDescriptor;
  export interface ParseComponentOptions {
    pad: 'line' | 'space';
  }

  export interface CompilerOptions {
    canBeLeftOpenTag?: (tag: string) => ?boolean; // check if a tag can be left opened
    directives?: { [key: string]: Function }; // platform specific directives
    isReservedTag?: (tag: string) => ?boolean; // check if a tag is a native for the platform
    isUnaryTag?: (tag: string) => ?boolean; // check if a tag is unary for the platform
    modules?: Array<ModuleOptions>; // platform specific modules; e.g. style; class
    optimize?: boolean; // optimize static content?
    preserveWhitespace?: boolean; // preserve whitespace between elements?
    staticKeys?: string; // a list of AST properties to be considered static; for optimization
    warn?: Function; // allow customizing warning in different environments; e.g. node

    // web specific
    expectHTML?: boolean; // only false for non-web builds
    getTagNamespace?: (tag: string) => string; // check the namespace for a tag
    isFromDOM?: boolean;
    isPreTag?: (attr: string) => boolean; // check if a tag needs to preserve whitespace
    mustUseProp?: (tag: string, type?: string, name: string) => boolean; // check if an attribute should be bound as a property
    shouldDecodeNewlines?:  boolean;
    shouldDecodeNewlinesForHref?: boolean;
    shouldDecodeTags?: boolean;

    // runtime user-configurable
    comments?: boolean; // preserve comments in template
    delimiters?: [string, string]; // template delimiters

    // for ssr optimization compiler
    scopeId?: string;
  };

  export interface CompiledResult {
    ast: ASTElement;
    render: string;
    staticRenderFns: string[];
    stringRenderFns?: string[];
    errors?: string[];
    tips?: string[];
  }

  export interface ModuleOptions {
    // transform an AST node before any attributes are processed
    // returning an ASTElement from pre/transforms replaces the element
    preTransformNode: (el: ASTElement) => ASTElement;
    // transform an AST node after built-ins like v-if, v-for are processed
    transformNode: (el: ASTElement) => ASTElement;
    // transform an AST node after its children have been processed
    // cannot return replacement in postTransform because tree is already finalized
    postTransformNode: (el: ASTElement) => void;
    genData: (el: ASTElement) => string; // generate extra data string for an element
    transformCode?: (el: ASTElement, code: string) => string; // further transform generated code for an element
    staticKeys?: Array<string>; // AST properties to be considered static
  }

  export type ASTModifiers = { [key: string]: boolean };
  export type ASTIfCondition = { exp?: string; block: ASTElement };
  export type ASTIfConditions = Array<ASTIfCondition>;

  export interface ASTElementHandler {
    value: string;
    params?: Array<any>;
    modifiers?: ASTModifiers;
  };

  export interface ASTElementHandlers {
    [key: string]: ASTElementHandler | Array<ASTElementHandler>;
  };

  export interface ASTDirective {
    name: string;
    rawName: string;
    value: string;
    arg?: string;
    modifiers?: ASTModifiers;
  };

  export type ASTNode = ASTElement | ASTText | ASTExpressi;

  export interface ASTElement {
    type: 1;
    tag: string;
    attrsList: Array<{ name: string; value: any }>;
    attrsMap: { [key: string]: any };
    parent: ASTElement | void;
    children: Array<ASTNode>;

    processed?: true;

    static?: boolean;
    staticRoot?: boolean;
    staticInFor?: boolean;
    staticProcessed?: boolean;
    hasBindings?: boolean;

    text?: string;
    attrs?: Array<{ name: string; value: any }>;
    props?: Array<{ name: string; value: string }>;
    plain?: boolean;
    pre?: true;
    ns?: string;

    component?: string;
    inlineTemplate?: true;
    transitionMode?: string | null;
    slotName?: string;
    slotTarget?: string;
    slotScope?: string;
    scopedSlots?: { [name: string]: ASTElement };

    ref?: string;
    refInFor?: boolean;

    if?: string;
    ifProcessed?: boolean;
    elseif?: string;
    else?: true;
    ifConditions?: ASTIfConditions;

    for?: string;
    forProcessed?: boolean;
    key?: string;
    alias?: string;
    iterator1?: string;
    iterator2?: string;

    staticClass?: string;
    classBinding?: string;
    staticStyle?: string;
    styleBinding?: string;
    events?: ASTElementHandlers;
    nativeEvents?: ASTElementHandlers;

    transition?: string | true;
    transitionOnAppear?: boolean;

    model?: {
      value: string;
      callback: string;
      expression: string;
    };

    directives?: Array<ASTDirective>;

    forbidden?: true;
    once?: true;
    onceProcessed?: boolean;
    wrapData?: (code: string) => string;
    wrapListeners?: (code: string) => string;

    // 2.4 ssr optimization
    ssrOptimizability?: number;

    // weex specific
    appendAsTree?: boolean;
  };

  export interface ASTExpression {
    type: 2;
    expression: string;
    text: string;
    tokens: Array<string | Object>;
    static?: boolean;
    // 2.4 ssr optimization
    ssrOptimizability?: number;
  };

  export interface ASTText {
    type: 3;
    text: string;
    static?: boolean;
    isComment?: boolean;
    // 2.4 ssr optimization
    ssrOptimizability?: number;
  };

  // SFC-parser related declarations

  // an object format describing a single-file component.
  export interface SFCDescriptor {
    template?: SFCBlock;
    script?: SFCBlock;
    styles: Array<SFCBlock>;
    customBlocks: Array<SFCBlock>;
  }

  export type SFCBlockType = 'template' | 'script' | 'style' | 'customBlocks';

  export interface SFCBlock {
    type: SFCBlockType;
    content: string;
    attrs: { [attribute:string]: string };
    start?: number;
    end?: number;
    lang?: string;
    src?: string;
    scoped?: boolean;
    module?: string | boolean;
  }
}