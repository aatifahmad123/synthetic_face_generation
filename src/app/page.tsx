import Image from 'next/image';
import { reportContent } from '@/lib/constants';
import { LossChart } from '@/components/charts/loss-chart';
import { AccuracyChart } from '@/components/charts/accuracy-chart';
import { MetricComparisonChart } from '@/components/charts/metric-comparison-chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-12 text-center">
        Synthetic Face Generation and Classification using WGAN-GP and CNN
      </h1>

      {/* 1. Use Case / Introduction */}
      <section id="introduction">
        <h2>1. Use Case</h2>
        <p>{reportContent.introduction}</p>
      </section>

      <Separator className="my-12" />

      {/* 2. Data Preparation */}
      <section id="data-preparation">
        <h2>2. Data Preparation</h2>

        <h3 id="data-loading">2.1 Dataset Loading</h3>
        <p>The CelebA dataset, comprising 202,599 celebrity face images, was accessed using a custom PyTorch CustomCelebADataset class. This class integrated image data with attribute and partition information from provided CSV files (<code>list_attr_celeba.csv</code> and <code>list_eval_partition.csv</code>). The "Young" attribute, originally encoded as -1 (not young) and 1 (young), was remapped to 0 and 1, respectively, for binary classification tasks in later stages.</p>

        <h3 id="data-preprocessing">2.2 Image Preprocessing</h3>
        <p>Images were resized to a uniform resolution of (3 x 64 x 64) to ensure compatibility with the Wasserstein GAN (WGAN) and classifier models. A PyTorch transform pipeline was applied, which included converting images to tensors and normalizing pixel values with a mean of 0.5 and a standard deviation of 0.5 across RGB channels. This normalization stabilized training by ensuring consistent input distributions.</p>

        <h3 id="data-splitting">2.3 Dataset Splitting and Subsampling</h3>
        <p>The dataset was partitioned into training, validation, and test sets based on the partition indices provided in the CelebA dataset (0: training, 1: validation, 2: test). To manage computational resources, a subset of 30,000 images was randomly sampled while preserving the original proportional split (approximately 80% training, 10% validation, 10% test). This resulted in 24,102 training images, 2,941 validation images, and 2,957 test images. Random sampling was performed with a fixed seed (42) for reproducibility.</p>

        <h3 id="data-loader">2.4 DataLoader Setup</h3>
        <p>PyTorch DataLoader objects were created for each subset to enable efficient batch processing. A batch size of 128 was chosen to balance memory usage and training speed. The training DataLoader was set to shuffle data for better model generalization, while the validation and test DataLoaders used sequential sampling to ensure consistent evaluation.</p>

        <h3 id="data-visualization">2.5 Visualization</h3>
        <p>{reportContent.dataPreparation.visualization}</p>
        <div className="my-6 flex justify-center">
          <Image
            src="https://picsum.photos/seed/dataprep/500/500" // Placeholder for /images/dataprep_grid.png
            alt="Preprocessed CelebA Images Grid"
            width={500}
            height={500}
            className="rounded-lg shadow-md bg-white" // Added white bg for picsum
            data-ai-hint="face grid collage"
          />
        </div>
        <p className="text-center text-sm text-muted-foreground">Figure 1: Grid of preprocessed CelebA training images.</p>
      </section>

      <Separator className="my-12" />

      {/* 3. WGAN Implementation */}
      <section id="wgan-implementation">
        <h2>3. WGAN Implementation</h2>

        <h3 id="wgan-architecture">3.1 Model Architecture</h3>
        <p>A Wasserstein GAN (WGAN) with gradient penalty was developed to generate synthetic CelebA images. The generator took a 100-dimensional latent vector as input and used five transposed convolutional layers with batch normalization and ReLU activations, followed by a Tanh activation to output 3x64x64 RGB images. The discriminator (critic) consisted of five convolutional layers with LeakyReLU activations, producing a single scalar to evaluate image realism.</p>

        <h3 id="wgan-training">3.2 Training Procedure</h3>
        <p>The WGAN was trained for 30 epochs on the training dataset of 24,102 images using the Adam optimizer with a learning rate of 0.0001 and beta parameters (0.0, 0.9). The discriminator was updated five times per generator update to ensure stable critic training. A gradient penalty with a weight of 10 was applied to enforce the Lipschitz constraint, calculated using interpolated samples between real and fake images. The discriminator loss was based on the Wasserstein distance (difference in critic outputs for real and fake images) plus the gradient penalty, while the generator loss minimized the negative critic output for generated images.</p>

        <h3 id="wgan-loss-viz">3.3 Loss Visualization</h3>
        <p>{reportContent.wganImplementation.lossVisualization}</p>
        <div className="my-6 h-[350px]">
           <LossChart title="WGAN Generator & Discriminator Loss (Initial Training)" />
        </div>
         <p className="text-center text-sm text-muted-foreground">Figure 2: WGAN Generator & Discriminator Loss during initial training.</p>


        <h3 id="wgan-image-viz">3.4 Generated Image Visualization</h3>
        <p>{reportContent.wganImplementation.generatedImages}</p>
        <div className="my-6 flex justify-center">
          <Image
            src="https://picsum.photos/seed/wganinitial/500/500" // Placeholder for /images/wgan_initial_grid.png
            alt="Initial WGAN Generated Images Grid"
            width={500}
            height={500}
            className="rounded-lg shadow-md bg-white" // Added white bg for picsum
            data-ai-hint="synthetic face grid collage"
          />
        </div>
         <p className="text-center text-sm text-muted-foreground">Figure 3: Grid of synthetic faces generated by the initial WGAN.</p>


         <h3 id="wgan-eval">3.5 Quantitative Evaluation</h3>
        <p>{reportContent.wganImplementation.evaluation}</p>
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
         <p className="text-center text-sm text-muted-foreground">Table 1: Initial WGAN Evaluation Metrics.</p>
      </section>

      <Separator className="my-12" />

      {/* 4. Hyperparameter Tuning */}
      <section id="hyperparameter-tuning">
        <h2>4. Hyperparameter Tuning</h2>

        <h3 id="tuning-setup">4.1 Tuning Setup</h3>
        <p>Hyperparameter optimization was performed using the Optuna library to enhance the quality of synthetic images generated by the WGAN. The objective was to minimize the Fréchet Inception Distance (FID) score, a key metric for assessing the similarity between real and synthetic image distributions. Four hyperparameters were tuned: learning rate (range: \(10^{-5}\) to \(10^{-3}\), log scale), batch size (choices: 32, 64, 128), latent dimension (choices: 64, 100, 128), and number of critic updates per generator update (range: 3 to 10). Five trials were conducted, each training a WGAN for 10 epochs.</p>

        <h3 id="tuning-results">4.2 Optimization Results</h3>
        <p>The best trial yielded an FID of 748.77 with the following hyperparameters: learning rate = 0.000414, batch size = 64, latent dimension = 64, and number of critic updates = 9. Subsequent evaluation showed variability due to limited real image samples. Other trials produced higher FID scores (ranging from 801.29 to 1433.70), highlighting the sensitivity of WGAN performance to hyperparameter choices.</p>

        <h3 id="tuning-retraining">4.3 Retraining with Optimal Parameters</h3>
        <p>Using the optimal hyperparameters, the WGAN was retrained for 30 epochs on the training dataset (24,102 images). The training process followed the same WGAN algorithm with a gradient penalty weight of 10, ensuring stable convergence similar to the initial setup.</p>

         <h3 id="tuning-quality">4.4 Quality Assessment</h3>
         <p>{reportContent.hyperparameterTuning.quality}</p>
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
                <TableCell className="text-green-600">+19.0%</TableCell> {/* Keep color for emphasis */}
              </TableRow>
              <TableRow>
                <TableCell>Fréchet Inception Distance (FID)</TableCell>
                <TableCell>585.03</TableCell>
                <TableCell>983.53</TableCell>
                 <TableCell className="text-red-600">+68.1%</TableCell> {/* Keep color for emphasis */}
              </TableRow>
            </TableBody>
          </Table>
           <p className="text-center text-sm text-muted-foreground">Table 2: WGAN Evaluation Metrics Comparison (Initial vs. Tuned).</p>


        <h3 id="tuning-visual">4.5 Visual Comparison</h3>
        <p>{reportContent.hyperparameterTuning.visual}</p>
        <div className="my-6 flex justify-center">
           <Image
            src="https://picsum.photos/seed/wgantuned/500/500" // Placeholder for /images/wgan_tuned_grid.png
            alt="Tuned WGAN Generated Images Grid"
            width={500}
            height={500}
            className="rounded-lg shadow-md bg-white" // Added white bg for picsum
            data-ai-hint="generated face grid collage"
          />
        </div>
         <p className="text-center text-sm text-muted-foreground">Figure 4: Grid of synthetic faces generated by the tuned WGAN.</p>
      </section>

      <Separator className="my-12" />

      {/* 5. Classifier Training (Real Data) */}
      <section id="classifier-real">
        <h2>5. Classifier Training (Real Data)</h2>

        <h3 id="classifier-real-arch">5.1 Model Architecture</h3>
        <p>A convolutional neural network (CNN) classifier was designed to perform binary classification of CelebA faces as "Young" or "Old" based on the "Young" attribute. The CNN comprised three convolutional layers with ReLU activations and max-pooling, followed by two fully connected layers with a ReLU activation, dropout (0.5) for regularization, and a sigmoid output to produce probabilities.</p>

        <h3 id="classifier-real-training">5.2 Training Procedure</h3>
        <p>The classifier was trained for 30 epochs on the real training dataset (24,102 images) using the Adam optimizer with a learning rate of 0.001 and a batch size of 128. The binary cross-entropy loss (BCELoss) was used as the loss function. Training progress was monitored by computing the average training loss per epoch. Validation was performed on the validation dataset (2,941 images) to track loss and accuracy, ensuring proper model learning and preventing overfitting.</p>

        <h3 id="classifier-real-perf">5.3 Training and Validation Performance</h3>
        <p>{reportContent.classifierReal.performance}</p>
        <div className="my-6 h-[350px]">
           <LossChart title="Classifier Training & Validation Loss (Real Data)" />
        </div>
         <p className="text-center text-sm text-muted-foreground">Figure 5: Classifier loss curves when trained on real data.</p>
         <div className="my-6 h-[350px]">
           <AccuracyChart title="Classifier Validation Accuracy (Real Data)" />
        </div>
         <p className="text-center text-sm text-muted-foreground">Figure 6: Classifier validation accuracy when trained on real data.</p>

        <h3 id="classifier-real-eval">5.4 Test Set Evaluation</h3>
        <p>{reportContent.classifierReal.evaluation}</p>
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
        <p className="text-center text-sm text-muted-foreground">Table 3: Performance metrics of the classifier trained on real data.</p>

      </section>

       <Separator className="my-12" />

      {/* 6. Annotating Synthetic Data */}
      <section id="annotating-synthetic">
        <h2>6. Annotating Synthetic Data</h2>

        <h3 id="annotating-generation">6.1 Synthetic Data Generation</h3>
        <p>The trained Wasserstein GAN (WGAN) with optimized hyperparameters (latent dimension = 64) was used to generate 16,871 synthetic images, equivalent to 70% of the real training dataset size (24,102 images). The generator produced images in batches of 128, with each image being a (3 x 64 x 64) RGB face sample derived from random latent vectors.</p>

        <h3 id="annotating-process">6.2 Annotation Process</h3>
        <p>The previously trained CNN classifier, loaded from <code>cnn_classifier_real_data.pth</code>, was used to annotate the synthetic images. The classifier, set to evaluation mode, predicted binary labels ("Young" or "Old") for each synthetic image by applying a threshold of 0.5 to its sigmoid output. Annotations were performed in batches concurrently with image generation to optimize computational efficiency, resulting in 16,871 labeled synthetic images.</p>
      </section>

       <Separator className="my-12" />

      {/* 7. Classifier Training (Mixed Data) */}
      <section id="classifier-mixed">
        <h2>7. Training a Classifier (Real + Synthetic Data)</h2>

        <h3 id="classifier-mixed-prep">7.1 Dataset Preparation</h3>
        <p>A mixed dataset was created by combining 16,871 synthetic images (70% of the original training dataset size) with 16,871 randomly sampled real images from the training dataset, resulting in a total of 33,742 images. The synthetic images and their corresponding "Young" or "Old" labels, generated and annotated in Part 6, were loaded from saved tensors. The real images were selected using random permutation to ensure diversity. A PyTorch ConcatDataset was used to merge the synthetic and real datasets, and a DataLoader was created with a batch size of 128 and shuffling enabled to facilitate training.</p>

        <h3 id="classifier-mixed-training">7.2 Model Training</h3>
        <p>A new CNN classifier, identical in architecture to the one used in Part 5 (three convolutional layers with ReLU and max-pooling, followed by two fully connected layers with dropout and sigmoid output), was trained on the combined dataset for 30 epochs. The Adam optimizer with a learning rate of 0.001 and binary cross-entropy loss were employed. Training loss was monitored and decreased consistently, stabilizing around 0.30, indicating effective learning on the mixed dataset.</p>


        <h3 id="classifier-mixed-eval">7.3 Test Set Evaluation</h3>
        <p>{reportContent.classifierMixed.evaluation}</p>
        <div className="my-6 h-[400px]">
          <MetricComparisonChart />
        </div>
         <p className="text-center text-sm text-muted-foreground">Figure 7: Comparison of classifier performance (Real Data vs. Mixed Data).</p>

        <h3 id="classifier-mixed-analysis">7.4 Analysis</h3>
        <p>{reportContent.classifierMixed.analysis}</p>
      </section>
    </div>
  );
}
