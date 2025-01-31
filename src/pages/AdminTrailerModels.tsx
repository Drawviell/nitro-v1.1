import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { TrailerModelForm } from "@/components/trailer/TrailerModelForm";
import { TrailerModelCard } from "@/components/trailer/TrailerModelCard";
import { TrailerModel } from "@/types/trailer";

const AdminTrailerModels = () => {
  const [models, setModels] = useState<TrailerModel[]>([]);

  const handleAddModel = (model: TrailerModel) => {
    setModels([...models, model]);
  };

  return (
    <Layout userRole="admin" userName="Admin User" companyName="Nitro Trailers">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Trailer Models</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-nitro-red hover:bg-red-700">
                <Plus className="mr-2 h-4 w-4" />
                Add New Model
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Trailer Model</DialogTitle>
              </DialogHeader>
              <TrailerModelForm onSubmit={handleAddModel} />
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((model) => (
            <TrailerModelCard key={model.id} model={model} onDelete={() => setModels(models.filter(m => m.id !== model.id))} />
          ))}
        </div>
        
        {models.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No trailer models added yet. Click the button above to add your first model.
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminTrailerModels;
