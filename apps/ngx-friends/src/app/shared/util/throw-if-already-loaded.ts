export function throwIfAlreadyLoaded(parentModule, moduleName: string): void {
  if (parentModule) {
    const errorMsg = `${moduleName} has already been loaded. Import Core modules in the AppModule only.`;
    throw new Error(errorMsg);
  }
}
