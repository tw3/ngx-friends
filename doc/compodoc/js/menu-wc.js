'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ngx-friends documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-66f25f1875dcd06d017e02775d24ef6d"' : 'data-target="#xs-components-links-module-AppModule-66f25f1875dcd06d017e02775d24ef6d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-66f25f1875dcd06d017e02775d24ef6d"' :
                                            'id="xs-components-links-module-AppModule-66f25f1875dcd06d017e02775d24ef6d"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ChartCardsUiModule.html" data-type="entity-link">ChartCardsUiModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ChartCardsUiModule-39a2ffebbb61e7d5228e200b9e6e7d2f"' : 'data-target="#xs-components-links-module-ChartCardsUiModule-39a2ffebbb61e7d5228e200b9e6e7d2f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ChartCardsUiModule-39a2ffebbb61e7d5228e200b9e6e7d2f"' :
                                            'id="xs-components-links-module-ChartCardsUiModule-39a2ffebbb61e7d5228e200b9e6e7d2f"' }>
                                            <li class="link">
                                                <a href="components/BubbleChartCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BubbleChartCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ForceDirectedGraphCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ForceDirectedGraphCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HorizontalBarChartCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HorizontalBarChartCardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommonMaterialModule.html" data-type="entity-link">CommonMaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreMaterialModule.html" data-type="entity-link">CoreMaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CoreModule-70c9e6b27a2e0abce4e07e24d4c31cfb"' : 'data-target="#xs-injectables-links-module-CoreModule-70c9e6b27a2e0abce4e07e24d4c31cfb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CoreModule-70c9e6b27a2e0abce4e07e24d4c31cfb"' :
                                        'id="xs-injectables-links-module-CoreModule-70c9e6b27a2e0abce4e07e24d4c31cfb"' }>
                                        <li class="link">
                                            <a href="injectables/NotificationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>NotificationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreNgrxModule.html" data-type="entity-link">CoreNgrxModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardModule.html" data-type="entity-link">DashboardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DashboardModule-a6c420db536759ff3ea0482ced4af2cf"' : 'data-target="#xs-components-links-module-DashboardModule-a6c420db536759ff3ea0482ced4af2cf"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardModule-a6c420db536759ff3ea0482ced4af2cf"' :
                                            'id="xs-components-links-module-DashboardModule-a6c420db536759ff3ea0482ced4af2cf"' }>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardRoutingModule.html" data-type="entity-link">DashboardRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedUiModule.html" data-type="entity-link">SharedUiModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedUiModule-4ad9f12c16262788558bdc874b0c58cf"' : 'data-target="#xs-components-links-module-SharedUiModule-4ad9f12c16262788558bdc874b0c58cf"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedUiModule-4ad9f12c16262788558bdc874b0c58cf"' :
                                            'id="xs-components-links-module-SharedUiModule-4ad9f12c16262788558bdc874b0c58cf"' }>
                                            <li class="link">
                                                <a href="components/NoContentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NoContentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link">UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UsersModule-419ace2fb08da82282f2553d8c24ef75"' : 'data-target="#xs-components-links-module-UsersModule-419ace2fb08da82282f2553d8c24ef75"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UsersModule-419ace2fb08da82282f2553d8c24ef75"' :
                                            'id="xs-components-links-module-UsersModule-419ace2fb08da82282f2553d8c24ef75"' }>
                                            <li class="link">
                                                <a href="components/UsersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersReportModule.html" data-type="entity-link">UsersReportModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UsersReportModule-ae3b2e1e20998f89b5d713447fb6ebb3"' : 'data-target="#xs-components-links-module-UsersReportModule-ae3b2e1e20998f89b5d713447fb6ebb3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UsersReportModule-ae3b2e1e20998f89b5d713447fb6ebb3"' :
                                            'id="xs-components-links-module-UsersReportModule-ae3b2e1e20998f89b5d713447fb6ebb3"' }>
                                            <li class="link">
                                                <a href="components/UsersReportComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersReportComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersReportGraphsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersReportGraphsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersReportUserFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersReportUserFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersReportRoutingModule.html" data-type="entity-link">UsersReportRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UsersRoutingModule.html" data-type="entity-link">UsersRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/D3GraphDataGenerator.html" data-type="entity-link">D3GraphDataGenerator</a>
                            </li>
                            <li class="link">
                                <a href="classes/RandomUtil.html" data-type="entity-link">RandomUtil</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/NotificationService.html" data-type="entity-link">NotificationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersApiService.html" data-type="entity-link">UsersApiService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersEffects.html" data-type="entity-link">UsersEffects</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AppState.html" data-type="entity-link">AppState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BubbleChartDataPoint.html" data-type="entity-link">BubbleChartDataPoint</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BubbleChartSeriesDataItem.html" data-type="entity-link">BubbleChartSeriesDataItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Chainable.html" data-type="entity-link">Chainable</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Chainable-1.html" data-type="entity-link">Chainable</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Chainable-2.html" data-type="entity-link">Chainable</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/D3Graph.html" data-type="entity-link">D3Graph</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/D3GraphLink.html" data-type="entity-link">D3GraphLink</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/D3GraphNode.html" data-type="entity-link">D3GraphNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ForceDirectedGraph.html" data-type="entity-link">ForceDirectedGraph</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ForceDirectedGraph-1.html" data-type="entity-link">ForceDirectedGraph</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ForceDirectedGraphLink.html" data-type="entity-link">ForceDirectedGraphLink</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ForceDirectedGraphLink-1.html" data-type="entity-link">ForceDirectedGraphLink</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ForceDirectedGraphNode.html" data-type="entity-link">ForceDirectedGraphNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ForceDirectedGraphNode-1.html" data-type="entity-link">ForceDirectedGraphNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FormUser.html" data-type="entity-link">FormUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HorizontalBarChartDataPoint.html" data-type="entity-link">HorizontalBarChartDataPoint</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserEntity.html" data-type="entity-link">UserEntity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UsersState.html" data-type="entity-link">UsersState</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});