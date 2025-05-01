import Image from 'next/image';
import { SectionCard } from '@/components/section-card';
import { reportContent } from '@/lib/constants';
import { LossChart } from '@/components/charts/loss-chart';
import { AccuracyChart } from '@/components/charts/accuracy-chart';
import { MetricComparisonChart } from '@/components/charts/metric-comparison-chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Home() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-12 text-center text-4xl font-bold tracking-tight text-primary">
        Synthetic Faces Explorer
      </h1>

      {/* Introduction / Use Case */}
      <SectionCard
        id="introduction"
        title="1. Use Case"
        content={reportContent.introduction}
      />

      {/* Data Preparation */}
      <SectionCard
        id="data-preparation"
        title="2. Data Preparation"
        content={reportContent.dataPreparation.main}
      >
        <h3 className="mb-3 mt-6 text-xl font-semibold">2.5 Visualization</h3>
        <p className="mb-4">{reportContent.dataPreparation.visualization}</p>
        <div className="my-6 flex justify-center">
          <Image
            src="https://picsum.photos/seed/dataprep/500/500"
            alt="Preprocessed CelebA Images Grid"
            width={500}
            height={500}
            className="rounded-lg shadow-md"
            data-ai-hint="face grid collage"
          />
        </div>
      </SectionCard>

      {/* WGAN Implementation */}
      <SectionCard
        id="wgan-implementation"
        title="3. WGAN Implementation"
        content={reportContent.wganImplementation.main}
      >
        <h3 className="mb-3 mt-6 text-xl font-semibold">3.3 Loss Visualization</h3>
        <p className="mb-4">{reportContent.wganImplementation.lossVisualization}</p>
        <div className="my-6 h-[350px]">
           <LossChart title="WGAN Generator & Discriminator Loss (Initial Training)" />
        </div>
        <h3 className="mb-3 mt-6 text-xl font-semibold">3.4 Generated Image Visualization</h3>
        <p className="mb-4">{reportContent.wganImplementation.generatedImages}</p>
        <div className="my-6 flex justify-center">
          <Image
            src="https://picsum.photos/seed/wganinitial/500/500"
            alt="Initial WGAN Generated Images Grid"
            width={500}
            height={500}
            className="rounded-lg shadow-md"
            data-ai-hint="synthetic face grid collage"
          />
        </div>
         <h3 className="mb-3 mt-6 text-xl font-semibold">3.5 Quantitative Evaluation</h3>
        <p className="mb-4">{reportContent.wganImplementation.evaluation}</p>
         <Table className="my-4">
          <TableHeader>
            <TableRow>
              <TableHead>Metric</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Inception Score (IS)</TableCell>
              <TableCell>2.74 ± 0.12</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Fréchet Inception Distance (FID)</TableCell>
              <TableCell>585.03</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </SectionCard>

      {/* Hyperparameter Tuning */}
      <SectionCard
        id="hyperparameter-tuning"
        title="4. Hyperparameter Tuning"
        content={reportContent.hyperparameterTuning.main}
      >
         <h3 className="mb-3 mt-6 text-xl font-semibold">4.4 Quality Assessment</h3>
         <p className="mb-4">{reportContent.hyperparameterTuning.quality}</p>
          <Table className="my-4">
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>Initial Value</TableHead>
                <TableHead>Tuned Value</TableHead>
                <TableHead>% Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Inception Score (IS)</TableCell>
                <TableCell>2.74 ± 0.12</TableCell>
                <TableCell>3.26 ± 0.20</TableCell>
                <TableCell className="text-green-600">+19.0%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fréchet Inception Distance (FID)</TableCell>
                <TableCell>585.03</TableCell>
                <TableCell>983.53</TableCell>
                 <TableCell className="text-red-600">+68.1%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        <h3 className="mb-3 mt-6 text-xl font-semibold">4.5 Visual Comparison</h3>
        <p className="mb-4">{reportContent.hyperparameterTuning.visual}</p>
        <div className="my-6 flex justify-center">
           <Image
            src="https://picsum.photos/seed/wgantuned/500/500"
            alt="Tuned WGAN Generated Images Grid"
            width={500}
            height={500}
            className="rounded-lg shadow-md"
            data-ai-hint="generated face grid collage"
          />
        </div>
      </SectionCard>

      {/* Classifier Training (Real Data) */}
      <SectionCard
        id="classifier-real"
        title="5. Classifier Training (Real Data)"
        content={reportContent.classifierReal.main}
      >
        <h3 className="mb-3 mt-6 text-xl font-semibold">5.3 Training and Validation Performance</h3>
        <p className="mb-4">{reportContent.classifierReal.performance}</p>
        <div className="my-6 h-[350px]">
           <LossChart title="Classifier Training & Validation Loss (Real Data)" />
        </div>
         <div className="my-6 h-[350px]">
           <AccuracyChart title="Classifier Validation Accuracy (Real Data)" />
        </div>
        <h3 className="mb-3 mt-6 text-xl font-semibold">5.4 Test Set Evaluation</h3>
        <p className="mb-4">{reportContent.classifierReal.evaluation}</p>
         <Table className="my-4">
          <TableHeader>
            <TableRow>
              <TableHead>Metric</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow><TableCell>Accuracy</TableCell><TableCell>0.8380</TableCell></TableRow>
            <TableRow><TableCell>Precision</TableCell><TableCell>0.8504</TableCell></TableRow>
            <TableRow><TableCell>Recall</TableCell><TableCell>0.9524</TableCell></TableRow>
            <TableRow><TableCell>F1-Score</TableCell><TableCell>0.8985</TableCell></TableRow>
          </TableBody>
        </Table>
      </SectionCard>

      {/* Annotating Synthetic Data */}
      <SectionCard
        id="annotating-synthetic"
        title="6. Annotating Synthetic Data"
        content={reportContent.annotatingSynthetic.main}
      />

      {/* Classifier Training (Mixed Data) */}
      <SectionCard
        id="classifier-mixed"
        title="7. Training a Classifier (Real + Synthetic Data)"
        content={reportContent.classifierMixed.main}
      >
        <h3 className="mb-3 mt-6 text-xl font-semibold">7.3 Test Set Evaluation</h3>
        <p className="mb-4">{reportContent.classifierMixed.evaluation}</p>
        <div className="my-6 h-[400px]">
          <MetricComparisonChart />
        </div>
        <h3 className="mb-3 mt-6 text-xl font-semibold">7.4 Analysis</h3>
        <p>{reportContent.classifierMixed.analysis}</p>
      </SectionCard>
    </div>
  );
}
