#include <iostream>
#include <vector>
#define maks 1e5

using namespace std;

vector<vector<int>>graf={   { 0, 2, 0, 6, 0 },  
                            { 2, 0, 3, 8, 5 },  
                            { 0, 3, 0, 0, 7 },  
                            { 6, 8, 0, 0, 9 },  
                            { 0, 5, 7, 9, 0 } };        //matrica grafa
int n=5;                  //broj cvorova


void novegrane(int u, vector<int> &grane,vector<int> &roditelj){
    for(int i=0;i<n;i++){
        if(graf[u][i] && grane[i]>graf[u][i]){
            grane[i]=graf[u][i];
            roditelj[i]=u;
        }
    }
}

int minimalnaGrana(const vector<bool> &obradjen,const vector<int> &grane){
   int min=maks,indeks;
   for(int i=0;i<n;i++)
        if(!obradjen[i] && grane[i]< min ){
            min=grane[i];
            indeks=i;
        }
    return indeks;
}

int PrimAlg(){
    vector<int> minimalna_grana(n);     //niz koji cuva informaciju koja je grana najmanja za cvor sa tim indeksom
    vector<int> roditelj(n);            //niz koji cuva sa kojim cvorom je najmanja grana iz prethodnog niza
    vector<bool> obradjen(n);           // niz za proveru da li je cvor vec u minimalnom poveyujucem stablu ili ne

    obradjen[0]=true;

    for(int i=0;i<n;i++){
        minimalna_grana[i]=maks;        //postavljamo sve vrednosti minimalnih grana na neki veliki broj da se osiguramo da upadnu u mst
    }
    
    novegrane(0,minimalna_grana,roditelj);  //funkcija za azuriranje vrednosti nizova minimalna_grana i roditelj
    
    int u,tezina=0;                         //vrednost tezina ce cuveti ukupnu tezinu mst
    
    //petlja koja izracunava mcst  
    for(int i=1;i<n;i++){
        u=minimalnaGrana(obradjen,minimalna_grana);
        obradjen[u]=true;
        novegrane(u,minimalna_grana,roditelj);
        tezina+=minimalna_grana[u];
    }
    
    //ispis grana koje cine mst

    cout<<"Primov algoritam: \nMinimalno povezujuce stablo cine sledece grane"<<endl;
    for(int i=1;i<n;i++){
        cout<<roditelj[i]<<" - "<<i<< " tezina: "<< graf[roditelj[i]][i] <<endl;
    }
    return tezina;
    

}




int main(){
    int a=PrimAlg();
    cout<<"Ukupna tezina mst je: "<<a<<endl;

    return 0;
}
