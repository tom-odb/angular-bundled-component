import { Injectable, Compiler, ModuleWithComponentFactories, ComponentFactory } from '@angular/core';

@Injectable()
export class FieldLoaderService {

  constructor(
    private compiler: Compiler,
  ) { }

  /**
   * Load a field from the control store
   *
   * @param type - field type
   */
  public load(type: string): Promise<ComponentFactory<any>> {

    const capitalizedType = type.replace(/\b\w/g, l => l.toUpperCase());
    const fieldTypeModuleName = `${capitalizedType}FieldModule`;

    return this.fetchField(type)
      .then((data: any) => {
        return data.exports[fieldTypeModuleName];
      })
      .then((ngModule: any) => this.getFieldFactory(ngModule));
  }

  /**
   * Fetch a field from the control store
   *
   * @param type - field type
   */
  private fetchField(type: string): Promise<any> {
    // Load the control from Gist
    // Later we have to fetch the field control from the control store
    // tslint:disable-next-line
    const url = `/fields/${type}`;

    return fetch(url)
      .then((response: any) => response.text())
      .then((source: any) => this.compileField(source));
  }

  private compileField(source: any): Promise<any> {
    return Promise.all([
      import('@angular/core'),
      import('@angular/common'),
      import('@angular/forms'),
    ]).then(
      (([AngularCore, AngularCommon, AngularForms]) => {
        // This will hold all module exports
        const exports: any = {};
        // The list of modules that will be injected in the factory function
        const modules: any = {
          '@angular/core': AngularCore,
          '@angular/common': AngularCommon,
          '@angular/forms': AngularForms,
        };

        // Shim the require function inside the UMD module
        // tslint:disable-next-line
        // @ts-ignore
        const require = (module) => modules[module];

        // eval the source inside the current scope
        // tslint:disable-next-line
        eval(source);
        return {
          exports,
          require,
        };
      }),
      err => {
        throw err;
      }
    );
  }

  /**
   * Get the factory from the loaded field
   *
   * @param ngModule - Field module
   */
  private getFieldFactory(ngModule: any): Promise<ComponentFactory<any>> {
    // Compile the module and all components
    return this.compiler
      .compileModuleAndAllComponentsAsync(ngModule)
      .then((factories: ModuleWithComponentFactories<any>) => {
        return factories.componentFactories[0];
          // .find((componentFactory) => ngModule.getFieldComponent().name === componentFactory.componentType.name);
      });
  }
}
