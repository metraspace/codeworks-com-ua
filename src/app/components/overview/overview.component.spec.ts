import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverviewComponent } from './overview.component';
import { GridStateService } from '@app/services';
import { MockGridStateService } from '@app/services/grid-state/grid-state.service.spec';
import { ColorViewComponent, GridComponent, TimerComponent, VisualizerComponent } from '@app/components';

describe('OverviewComponent', () => {
    let component: OverviewComponent;
    let fixture: ComponentFixture<OverviewComponent>;
    let gridStateService: MockGridStateService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                OverviewComponent,
                VisualizerComponent,
                GridComponent,
                TimerComponent,
                ColorViewComponent,
            ],
            providers: [
                { provide: GridStateService, useClass: MockGridStateService }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OverviewComponent);
        component = fixture.componentInstance;
        gridStateService = TestBed.inject(GridStateService) as any;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle addNewGridItemFormVisible', () => {
        expect(component.addNewGridItemFormVisible).toBeFalse();
        component.toggleAddGridItemFormVisibility();
        expect(component.addNewGridItemFormVisible).toBeTrue();
        component.toggleAddGridItemFormVisibility();
        expect(component.addNewGridItemFormVisible).toBeFalse();
    });

    it('should return true for isGridItemsLimit when the limit is reached', () => {
        spyOnProperty(gridStateService, 'isGridItemsLimit', 'get').and.returnValue(true);
        expect(component.isGridItemsLimit).toBeTrue();
    });

    it('should return false for isGridItemsLimit when the limit is not reached', () => {
        spyOnProperty(gridStateService, 'isGridItemsLimit', 'get').and.returnValue(false);
        expect(component.isGridItemsLimit).toBeFalse();
    });

    it('should return true for isAddNewGridItemFormAvailable when form is visible and limit is not reached', () => {
        spyOnProperty(gridStateService, 'isGridItemsLimit', 'get').and.returnValue(false);
        component.addNewGridItemFormVisible = true;
        expect(component.isAddNewGridItemFormAvailable).toBeTrue();
    });

    it('should return false for isAddNewGridItemFormAvailable when form is not visible', () => {
        spyOnProperty(gridStateService, 'isGridItemsLimit', 'get').and.returnValue(false);
        component.addNewGridItemFormVisible = false;
        expect(component.isAddNewGridItemFormAvailable).toBeFalse();
    });

    it('should return false for isAddNewGridItemFormAvailable when limit is reached', () => {
        spyOnProperty(gridStateService, 'isGridItemsLimit', 'get').and.returnValue(true);
        component.addNewGridItemFormVisible = true;
        expect(component.isAddNewGridItemFormAvailable).toBeFalse();
    });

    it('should not toggle addNewGridItemFormVisible when addNewGridItem is called and limit is reached', () => {
        spyOnProperty(gridStateService, 'isGridItemsLimit', 'get').and.returnValue(true);
        component.addNewGridItemFormVisible = false;
        component.addNewGridItem();
        expect(component.addNewGridItemFormVisible).toBeFalse();
    });

    it('should toggle addNewGridItemFormVisible when addNewGridItem is called and limit is not reached', () => {
        spyOnProperty(gridStateService, 'isGridItemsLimit', 'get').and.returnValue(false);
        component.addNewGridItemFormVisible = false;
        component.addNewGridItem();
        expect(component.addNewGridItemFormVisible).toBeTrue();
    });
});
