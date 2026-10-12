import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AIResult, CVItem } from "@/redux/features/CV/Cv.type";
import { CheckCircle2, Star, Trophy, Users, Zap, X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CVComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: {
    cv1: CVItem;
    cv2: CVItem;
    aiResult: AIResult;
  } | null;
}

export default function CVComparisonModal({
  isOpen,
  onClose,
  result,
}: CVComparisonModalProps) {
  if (!result) return null;

  const { cv1, cv2, aiResult } = result;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[98vh] sm:max-h-[95vh] w-[98vw] sm:max-w-[95vw] lg:max-w-6xl flex flex-col p-0 gap-0 overflow-hidden bg-white border border-border-primary rounded-2xl">
        <DialogHeader className="p-4 sm:p-6 pb-4 bg-white border-b sticky top-0 z-10 shadow-sm/50 flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 bg-primary-blue/10 rounded-xl text-primary-blue">
              <Users className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <DialogTitle className="text-lg sm:text-2xl font-bold tracking-tight text-slate-900 leading-tight">
                Candidate Comparison
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-base text-slate-500 flex items-center gap-1.5">
                <span className="font-medium text-slate-900">
                  {cv1.firstName}
                </span>{" "}
                vs{" "}
                <span className="font-medium text-slate-900">
                  {cv2.firstName}
                </span>
              </DialogDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full hover:bg-slate-100 h-8 w-8 sm:h-10 sm:w-10"
          >
            <X className="h-5 w-5 text-slate-500" />
          </Button>
        </DialogHeader>

        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-7xl mx-auto">
            {/* Overall Verdict Section */}
            <Card className="border-primary-blue/20 bg-linear-to-br from-white to-blue-50/50 shadow-sm relative overflow-hidden border rounded-2xl">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none hidden sm:block">
                <Trophy className="w-48 h-48 sm:w-64 sm:h-64" />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg text-primary-blue">
                  <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                  AI Verdict
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-start">
                  <p className="text-slate-700 leading-relaxed text-sm sm:text-lg flex-1">
                    {aiResult.overallComparison}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Candidate A Column */}
              <div className="space-y-4 sm:space-y-6">
                <div className="md:sticky md:top-0 md:z-10 bg-slate-50/95 backdrop-blur md:py-2 md:-my-2">
                  <Card className="border-l-4 border-l-primary-blue shadow-sm rounded-xl">
                    <CardContent className="p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
                      <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-linear-to-br from-primary-blue to-blue-700 text-white flex items-center justify-center font-bold text-lg sm:text-2xl shadow-lg shadow-primary-blue/20">
                        {cv1.firstName[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-base sm:text-lg text-slate-900">
                          {cv1.firstName} {cv1.lastName}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium">
                          {cv1.jobTitle || "Candidate A"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Key Strengths A */}
                <Card className="shadow-sm border-slate-200">
                  <CardHeader className="pb-3 border-b border-slate-50 bg-slate-50/30">
                    <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                      <Star className="w-4 h-4 text-blue-500 fill-blue-500" />
                      Key Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-3">
                      {(aiResult.strengthsA || []).length > 0 ? (
                        (aiResult.strengthsA || []).map((strength, idx) => (
                          <li
                            key={idx}
                            className="flex gap-3 items-start text-slate-600 text-sm group"
                          >
                            <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                            <span className="leading-snug group-hover:text-slate-900 transition-colors">
                              {strength}
                            </span>
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-slate-400 italic flex items-center gap-2">
                          <Info className="w-4 h-4" />
                          No strengths identified
                        </li>
                      )}
                    </ul>
                  </CardContent>
                </Card>

                {/* Unique Skills A */}
                <Card className="shadow-sm border-slate-200">
                  <CardHeader className="pb-3 border-b border-slate-50 bg-slate-50/30">
                    <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                      Unique Differentiators
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex flex-wrap gap-2">
                      {(aiResult.uniqueSkillsA || []).map((skill, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="px-3 py-1 bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-100 transition-colors whitespace-normal text-center"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {(aiResult.uniqueSkillsA || []).length === 0 && (
                        <span className="text-sm text-slate-400 italic">
                          No unique skills identified
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

               {/* Candidate B Column */}
              <div className="space-y-4 sm:space-y-6">
                <div className="md:sticky md:top-0 md:z-10 bg-slate-50/95 backdrop-blur md:py-2 md:-my-2">
                  <Card className="border-l-4 border-l-purple-500 shadow-sm rounded-xl">
                    <CardContent className="p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
                      <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-linear-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg sm:text-2xl shadow-lg shadow-purple-500/20">
                        {cv2.firstName[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-base sm:text-lg text-slate-900">
                          {cv2.firstName} {cv2.lastName}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium">
                          {cv2.jobTitle || "Candidate B"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Key Strengths B */}
                <Card className="shadow-sm border-slate-200">
                  <CardHeader className="pb-3 border-b border-slate-50 bg-slate-50/30">
                    <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                      <Star className="w-4 h-4 text-purple-500 fill-purple-500" />
                      Key Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-3">
                      {(aiResult.strengthsB || []).length > 0 ? (
                        (aiResult.strengthsB || []).map((strength, idx) => (
                          <li
                            key={idx}
                            className="flex gap-3 items-start text-slate-600 text-sm group"
                          >
                            <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                            <span className="leading-snug group-hover:text-slate-900 transition-colors">
                              {strength}
                            </span>
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-slate-400 italic flex items-center gap-2">
                          <Info className="w-4 h-4" />
                          No strengths identified
                        </li>
                      )}
                    </ul>
                  </CardContent>
                </Card>

                {/* Unique Skills B */}
                <Card className="shadow-sm border-slate-200">
                  <CardHeader className="pb-3 border-b border-slate-50 bg-slate-50/30">
                    <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                      Unique Differentiators
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="flex flex-wrap gap-2">
                      {(aiResult.uniqueSkillsB || []).map((skill, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="px-3 py-1 bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-100 transition-colors whitespace-normal text-center"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {(aiResult.uniqueSkillsB || []).length === 0 && (
                        <span className="text-sm text-slate-400 italic">
                          No unique skills identified
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
