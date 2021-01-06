#include<iostream>
#include <vector>
#include <utility>
#include <functional>
#include <queue>
#define maks 1e5

using namespace std;

//podaci:
vector<vector<int>>graf={   { 0, 2, 0, 6, 0 },  
                            { 2, 0, 3, 8, 5 },  
                            { 0, 3, 0, 0, 7 },  
                            { 6, 8, 0, 0, 9 },  
                            { 0, 5, 7, 9, 0 } };       
int matrica[5][5]={         { -1, 2, -1, 6,-1 },  
                            { 2, -1, 3, 8, 5 },  
                            { -1, 3, -1, -1, 7 },  
                            { 6, 8, -1, -1, 9 },  
                            { -1, 5, 7, 9, -1 } };

int n=5;
int e1[5], e2[5];
int k;



vector<vector<pair<int,pair<int,int> > >>g={   
    {make_pair(2,make_pair(0,1)),make_pair(6,make_pair(0,3)) },  
    {make_pair(2,make_pair(1,0)),make_pair(3,make_pair(1,2)),make_pair(8,make_pair(1,3)),make_pair(5,make_pair(1,4)) },  
    {make_pair(3,make_pair(2,1)),make_pair(7,make_pair(2,4)) },  
    {make_pair(6,make_pair(3,0)),make_pair(8,make_pair(3,1)),make_pair(9,make_pair(3,4)) },  
    {make_pair(5,make_pair(4,1)),make_pair(7,make_pair(4,2)),make_pair(9,make_pair(4,3)) } };
int e,used[10005];
priority_queue<pair<int,pair<int,int> >, vector<pair<int,pair<int,int> > >, greater<pair<int,pair<int,int> > > > pq;


int Kruskal(){
    vector<int> skup(n); //za skupove
    vector<int> roditelj(n);//za grane 
    int i,j,tezina=0;
    for( i=0;i<n;i++)skup[i]=i; //svaki cvor cini stablo sam za sebe
    
    int levi,desni;
    for(int p=0;p<n-1;p++){
        // trazimo najmanju granu koja povezuje dva razlicita skupa cvorova
        levi=desni=-1;
        

        //grane prolazimo neopadajuće
        for(i=0;i<n;i++){
            for(j=0;j<n;j++){
                if(skup[i]!=skup[j] && matrica[i][j]!=-1){
                    if(levi==-1){
                        levi=i;
                        desni=j;
                    }
                    else if(matrica[i][j]<matrica[levi][desni]){          
                        levi=i;desni=j; 
                    }
                }
            }    
        }
        
        if(levi==-1) break;
        roditelj[desni]=levi; //dodajemo granu jer povezuje razlicita stabla 
        tezina+=matrica[levi][desni];

        for(i=0;i<n;i++)
            if(skup[i]==skup[desni]) skup[i]=skup[levi]; //azuriramo skup za sve cvorove iz skupa kome pripada desni
    }
    
    cout<<"Minimalno povezujuce stablo cine sledece grane:>"<<endl;
    for(int i=1;i<n;i++){
        cout<<roditelj[i]<<" - "<<i<< " tezina: "<< matrica[roditelj[i]][i] <<endl;
    }
    return tezina;
}

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
    vector<bool> obradjen(n);           // niz za proveru da li je cvor vec u minimalnom povezujucem stablu ili ne

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

void process(int u)                     // funkcija za obradu cvora
{
    used[u]=1;                          // kazemo da je 'obradjen' tj. dodat u trenutni mcst
    for(int i=0;i<g[u].size();i++)      // idemo po susedima
    {
        int v=g[u][i].second.second;
        if(!used[v])                    // za neobradjenog suseda dodajemo granu u pq
            pq.push(g[u][i]);
    }
}

int Prim() // slozenost algoritma je  O(E Log V) gde je E broj grana a V broj cvorova grafa
{
    int a=0;
    process(1);                         // krecemo od cvora 1
    while(!pq.empty())                  // dok god red sa prioritetom nije prazan
    {
        int v=pq.top().second.second, u=pq.top().second.first, w=pq.top().first;  // uzimamo sledeci element - granu
        pq.pop();
        if(!used[v])                    // ako nije obradjen, potrebno ga je obraditi
        {
            cout<<u<<" - "<<v<<" tezina: "<<w<<"\n"; // ispisemo granu
            a+=w;                  // dodajemo tezinu na ukupnu tezinu mcst
            process(v);                 // i zatim ga obradjujemo
        }
    }
    return a;
}


int main(){
    cout<<"Kruskalov algoritam: "<<endl;
    int a=Kruskal();
    cout<<"Ukupna tezina mcst Kruskalovim algoritmom je: "<<a<<endl;
    
    cout<<endl;
    
    a=PrimAlg();
    cout<<"Ukupna tezina mcst Primovim algoritmom1 je: "<<a<<endl;
    
    cout<<endl;
    
    a=Prim();
    cout<<"Ukupna tezina mcst Primovim algoritmom2 je: "<<a<<endl;
    

}
