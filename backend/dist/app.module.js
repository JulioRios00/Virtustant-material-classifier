"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const classification_controller_1 = require("./controllers/classification.controller");
const data_controller_1 = require("./controllers/data.controller");
const hazardous_classifier_service_1 = require("./services/hazardous-classifier.service");
const text_analyzer_service_1 = require("./services/text-analyzer.service");
const product_analyzer_service_1 = require("./services/product-analyzer.service");
const data_processor_service_1 = require("./services/data-processor.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            throttler_1.ThrottlerModule.forRoot([
                {
                    name: 'short',
                    ttl: 1000,
                    limit: 100,
                },
                {
                    name: 'medium',
                    ttl: 60000,
                    limit: 1000,
                },
            ]),
        ],
        controllers: [classification_controller_1.ClassificationController, data_controller_1.DataController],
        providers: [
            hazardous_classifier_service_1.HazardousClassifierService,
            text_analyzer_service_1.TextAnalyzerService,
            product_analyzer_service_1.ProductAnalyzerService,
            data_processor_service_1.DataProcessorService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map