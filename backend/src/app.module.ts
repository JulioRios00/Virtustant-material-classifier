import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ClassificationController } from './controllers/classification.controller';
import { DataController } from './controllers/data.controller';
import { HazardousClassifierService } from './services/hazardous-classifier.service';
import { TextAnalyzerService } from './services/text-analyzer.service';
import { ProductAnalyzerService } from './services/product-analyzer.service';
import { DataProcessorService } from './services/data-processor.service';

@Module({
  imports: [
    ThrottlerModule.forRoot([
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
  controllers: [ClassificationController, DataController],
  providers: [
    HazardousClassifierService,
    TextAnalyzerService,
    ProductAnalyzerService,
    DataProcessorService,
  ],
})
export class AppModule {}