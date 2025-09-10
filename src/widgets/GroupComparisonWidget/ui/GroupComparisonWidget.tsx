import React from "react";
import { GroupSelectButton } from '../../../features/ChoiceGroup/index';
import { SubjectSelectButton } from '../../../features/ChoiceSubject/index';
import { GradeCalendar } from '../../../features/Calendar/index';
import "./GroupComparisonWidget.css";
import { RozaSchemeForTwo } from "../../../features/GradeSchemeForTwo";
import { RozaScheme } from "../../../features/GradeScheme";
import { StudentDropdown } from "../../../shared/ui/index";
import { useGroupComparisonWidget } from "../../../shared/hooks/useGroupComparisonWidget";

interface IGroupComparisonWidget {
  groups: Array<{ name: string; id: string; }>;
  subjects: Array<{ name: string; id: string; }>;
}

export const GroupComparisonWidget: React.FC<IGroupComparisonWidget> = ({ groups, subjects }) => {
  const {
    selectedGroupId,
    setSelectedGroupId,
    setStudents,
    setSelectedStudentId,
    setShowScheme,
    students,
    handleItemClick,
    setSelectedSubjects,
    dateRange,
    setDateRange,
    handleFetchGrades,
    selectedSubjects,
    selectedStudentId,
    showScheme,
    groupGradesData,
    studentGradesData,
  } = useGroupComparisonWidget(groups)
  return (
    <div className="main-container">
      <div className="info-container">
        <GroupSelectButton
          elements={groups}
          onSelect={(id) => {
            setSelectedGroupId(id);
            setStudents([]);
            setSelectedStudentId(null);
            setShowScheme(false);
          }}
          title="Выбрать группу"
        />

          <StudentDropdown
          elements={students}
          title="Выбрать студента"
          onSelect={handleItemClick}
          />

        <SubjectSelectButton
          items={subjects}
          onChange={setSelectedSubjects}
          title="Выбрать предметы"
        />

        <GradeCalendar
          value={dateRange}
          onChange={(date) => {
            setDateRange(date as [Date, Date]);
          }}
          title="Выбрать период"
        />

        <button
          className="button button-end custom-button"
          onClick={handleFetchGrades}
          disabled={!selectedGroupId || (selectedSubjects.length < 3 && !selectedStudentId)}
        >
          Вывод
        </button>
      </div>

      {showScheme && selectedStudentId ? (
        <RozaSchemeForTwo
          gradesForTwo={{
            "Оценка группы": groupGradesData,
            "Оценка студента": studentGradesData,
          }}
          elements={selectedSubjects}
          isLoading={false}
        />
      ) : (
        <RozaScheme
          gradesData={groupGradesData}
          elements={selectedSubjects}
          isLoading={false}
        />
      )}
    </div>
  );
};
